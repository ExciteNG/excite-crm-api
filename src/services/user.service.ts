import axios from 'axios';
import Managers, { IManager } from '@/models/manager.model';
import { EXCITE_API_URL } from '@/config';

type CacheEntry = {
  expires: number;
  value?: any;
  promise?: Promise<any>;
};

class UserService {
  public managers = Managers;

  // simple in-memory cache: key -> { expires, value, promise }
  private static cache = new Map<string, CacheEntry>();
  // TTL in ms (configurable via env). Default 60 seconds.
  private static CACHE_TTL =
    Number(process.env.EXCITE_USERS_CACHE_TTL_MS) || 60_000;
  // cache key for all-users
  private static ALL_USERS_KEY = 'excite:all-users';

  /**
   * Fetch users with inline caching and request de-duplication.
   * Pass forceRefresh=true to bypass cache.
   */
  public async getExciteUsers(forceRefresh = false) {
    const key = UserService.ALL_USERS_KEY;
    const now = Date.now();
    const ttl = UserService.CACHE_TTL;

    const existing = UserService.cache.get(key);
    if (!forceRefresh && existing && existing.value && existing.expires > now) {
      return existing.value;
    }

    // If there's an inflight promise, await it to dedupe concurrent calls
    if (existing && existing.promise) {
      try {
        const val = await existing.promise;
        return val;
      } catch {
        // fallthrough to re-fetch
      }
    }

    // create fetch promise and store it so concurrent callers await same work
    const fetchPromise = (async () => {
      try {
        const response = await axios.get(`${EXCITE_API_URL}/admin/all-users`, {
          headers: {
            'auth-key':
              '$2b$10$BOGvznvYP96MuVPib0th9.WAbNE2GK3N2DTYzNt0agQtEXH0z1zUm',
            'content-type': 'application/json',
          },
          // timeout: 30_000, // avoid hanging requests
        });

        const users = response.data?.data ?? [];
        // process users (same logic as before)
        const processed = (users as any[]).map((u: any) => {
          const fullname: string =
            u.fullname ||
            `${u.firstName || ''} ${u.lastName || ''}`.trim() ||
            '';
          const storeInfo = u.storeInfo || null;
          const email: string = u.email || '';
          const phoneNumber: string =
            (u.phone && u.phone.trim()) ||
            (u.storeInfo && u.storeInfo.storePhone) ||
            (u.cellInfo && u.cellInfo.cell) ||
            '';

          const location = {
            address:
              (u.location && u.location.address) ||
              (storeInfo && storeInfo.storeAddress) ||
              '',
            lga:
              (u.location && u.location.lga) ||
              (storeInfo && storeInfo.storeLga) ||
              '',
            state:
              (u.location && u.location.state) ||
              (storeInfo && storeInfo.storeState) ||
              '',
            town: (u.location && u.location.town) || '',
          };

          const subscriptionPlan: string =
            u.plan ||
            (u.subscriptionLevel
              ? String(u.subscriptionLevel)
              : 'No Active Plan');
          const registrationDate: string =
            u.createdAt || (u.regStatus && u.regStatus.dateRegistered) || '';

          const businessCategory: string =
            (u.company && u.company.nature) || u.userType || '';

          const walletActive: boolean = Boolean(u.walletCreated);

          // determine status
          const isArchived = Boolean(u.isArchived);
          const verified = Boolean(u.verified || u.emailVerified);
          const lastActiveStr =
            u.lastLogin || u.updatedAt || u.createdAt || null;
          let status = 'PENDING';
          if (isArchived) {
            status = 'DEACTIVATED';
          } else if (!verified) {
            status = 'PENDING';
          } else if (lastActiveStr) {
            const lastActive = new Date(lastActiveStr).getTime();
            const diffDays = (Date.now() - lastActive) / (1000 * 60 * 60 * 24);
            status = diffDays > 30 ? 'DORMANT' : 'ACTIVE';
          } else {
            status = verified ? 'ACTIVE' : 'PENDING';
          }

          const numberOfProducts = Array.isArray(u.product)
            ? u.product.length
            : 0;
          const numberOfCustomers = Array.isArray(u.customers)
            ? u.customers.length
            : 0;

          return {
            id: u._id,
            fullname,
            storeInfo,
            email,
            phoneNumber,
            location,
            subscriptionPlan,
            registrationDate,
            businessCategory,
            walletActive,
            status,
            numberOfProducts,
            numberOfCustomers,
            // raw: u,
          };
        });

        // store in cache
        UserService.cache.set(key, {
          value: processed,
          expires: Date.now() + ttl,
        });

        return processed;
      } catch (err) {
        // drop cache entry on error so next call retries
        UserService.cache.delete(key);
        throw err;
      } finally {
        // ensure promise is cleared from cache (value already set on success)
        const entry = UserService.cache.get(key);
        if (entry && entry.promise) {
          delete entry.promise;
          UserService.cache.set(key, entry);
        }
      }
    })();

    // set promise entry so concurrent calls can await it
    UserService.cache.set(key, { expires: now + ttl, promise: fetchPromise });

    // await and return
    return fetchPromise;
  }

  /**
   * Helper to clear cache (useful for tests or admin actions).
   */
  public static clearCache() {
    UserService.cache.clear();
  }
}

export default UserService;
