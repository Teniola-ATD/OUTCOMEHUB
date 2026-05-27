const Opportunity = require('../Models/Opportunity');
const Application = require('../Models/Application');

// Post an Opportunity
const createOpportunity = async (req, res) => {
  try {
    const opportunity = new Opportunity(req.body);
    await opportunity.save();
    res.status(201).json({ success: true, data: opportunity });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Browse all Opportunities (with NGO info populated)
const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate('ngo_id', 'name organization_mission');
    res.status(200).json({ success: true, data: opportunities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Volunteer Applies for Opportunity
const applyToOpportunity = async (req, res) => {
  try {
    const { opportunity_id, volunteer_id } = req.body;
    const application = new Application({ opportunity_id, volunteer_id });
    await application.save();
    res.status(201).json({ success: true, message: "Application submitted successfully", data: application });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// NGO Admin reviews application (Approve/Reject)
const reviewApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, assigned_role } = req.body; // status must be 'approved' or 'rejected'

    const updatedApp = await Application.findByIdAndUpdate(
      applicationId,
      { status, assigned_role },
      { new: true }
    );
    res.status(200).json({ success: true, message: `Application status updated to ${status}`, data: updatedApp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createOpportunity, getAllOpportunities, applyToOpportunity, reviewApplication };