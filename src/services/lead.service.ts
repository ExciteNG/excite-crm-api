import { HttpException } from '@/exceptions/HttpException';
import Lead from '@/models/leads.model';
import { CreateLeadDto, UpdateLeadDto } from '@/validator/lead.validator';

class LeadService {
  public leads = Lead;

  public async getLeads() {
    const leads = await this.leads.find().exec();

    return leads;
  }

  public async getLeadById(id: string) {
    const lead = await this.leads.findById(id).exec();

    return lead;
  }

  public async createLead(leadData: CreateLeadDto['body']) {
    const newLead = new this.leads({
      name: {
        firstname: leadData.firstname,
        lastname: leadData.lastname,
      },
      email: leadData.email,
      phoneNumber: leadData.phoneNumber,
      businessName: leadData.businessName,
      businessCategory: leadData.businessCategory,
      source: leadData.source,
      location: {
        address: leadData.address,
        city: leadData.city,
        state: leadData.state,
        country: 'Nigeria',
      },
    });
    await newLead.save();

    return newLead;
  }

  public async updateLead(id: string, updateData: UpdateLeadDto['body']) {
    const lead = await this.leads.findById(id).exec();
    if (!lead) {
      throw new HttpException(400, 'Lead not found');
    }

    lead.name.firstname = updateData.firstname;
    lead.name.lastname = updateData.lastname;
    lead.email = updateData.email;
    lead.phoneNumber = updateData.phoneNumber;
    lead.businessName = updateData.businessName;
    lead.businessCategory = updateData.businessCategory;
    lead.source = updateData.source;
    lead.location.address = updateData.address;
    lead.location.city = updateData.city;
    lead.location.state = updateData.state;

    const updatedLead = await lead.save();

    return updatedLead;
  }

  public async deleteLead(id: string) {
    const deletedLead = await this.leads.findByIdAndDelete(id).exec();

    return deletedLead;
  }
}

export default LeadService;
