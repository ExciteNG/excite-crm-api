import axios from 'axios';
import Managers, { IManager } from '@/models/manager.model';

class ManagerService {
  public managers = Managers;

  public async getProfile(authUser: IManager) {
    const manager: IManager = await this.managers
      .findById(authUser._id)
      .select('-password -confirmationCode');

    return manager;
  }

  public async updateProfile(
    authUser: IManager,
    profileData: Partial<IManager>
  ): Promise<IManager> {
    const manager: IManager = await this.managers
      .findByIdAndUpdate(
        authUser._id,
        { $set: profileData },
        { new: true, runValidators: true }
      )
      .select('-password -confirmationCode');

    return manager;
  }

  public async getManagers() {
    const managers = await this.managers.find().exec();
    // .select('-password -confirmationCode');
    console.log(managers);

    return managers;
  }
}

export default ManagerService;
