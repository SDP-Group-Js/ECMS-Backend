// complaintController.test.js
import { allocateComplaint, reportComplaint, viewComplaints }  from '../server/api/complaint/controllers'

describe('Complaint Controller', () => {
  describe('allocateComplaint', () => {
    test('should allocate institutionId to complaint', async () => {
      const complaintId = '123';
      const institutionId = '456';
      const result = await allocateComplaint(complaintId, institutionId);
      expect(result.institutionId).toBe(institutionId);
    });
  });

  describe('reportComplaint', () => {
    test('should create a new complaint', async () => {
      const complainerId = '789';
      const complaintReport = 'Some complaint description';
      const result = await reportComplaint(complainerId, complaintReport);
      expect(result).toHaveProperty('id');
      expect(result.complainerId).toBe(complainerId);
      expect(result.complaint_description).toBe(complaintReport);
    });
  });

  describe('viewComplaints', () => {
    test('should view complaint with a specific id', async () => {
      const complaintId = '123';
      const complaint = await viewComplaints(complaintId);
      expect(complaint.id).toBe(complaintId)
      // Add assertions based on your implementation
    });

    test('should view complaints allocated to a specific institution', async() => {
      const institutionId = '456';
      const complaints = await viewComplaints(undefined, institutionId);
      for (var complaint in complaints) {
        expect(complaint.id)
      }
      // Add assertions based on your implementation
    });

    test('should view all unallocated complaints', async () => {
      const result = await viewComplaints();

      // Add assertions based on your implementation
    });
  });
});
