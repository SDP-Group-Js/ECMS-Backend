// investigationController.test.js
import { allocateInvestigation, startInvestigation } from '../server/api/investigation/controllers';

describe('Investigation Controller', () => {
  describe('startInvestigation', () => {
    test('should start a new investigation with a complaint', () => {
      const complaintId = '123';
      const result = startInvestigation(complaintId);
      expect(result).toHaveProperty('id');
      // Add assertions based on your implementation
    });
  });

  describe('allocateInvestigation', () => {
    test('should allocate investigation to a specific division/office', () => {
      const divisionOrOfficeId = '456';
      const optionalInstitutionId = '789';
      const result = allocateInvestigation(divisionOrOfficeId, optionalInstitutionId);
      expect(result).toHaveProperty('id');
      // Add assertions based on your implementation
    });
  });
});
