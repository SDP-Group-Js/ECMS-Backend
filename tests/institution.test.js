// institutionController.test.js
import { createInstitution, createDivision, createOffice, updateInstitution, updateDivision, updateOffice } from "../server/api/institution/controllers";

describe('Institution Controller', () => {
  describe('createInstitution', () => {
    test('should create a new institution', () => {
      const institutionName = 'New Institution';
      const result = createInstitution(institutionName);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(institutionName);
    });
  });

  describe('createDivision', () => {
    test('should create a new division under an institution', async () => {
      const institutionId = '123';
      const divisionName = 'New Division';
      const result = await createDivision(institutionId, divisionName);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(divisionName);
      expect(result.institutionId).toBe(institutionId);
    });
  });

  describe('createOffice', () => {
    test('should create a new office under a division', () => {
      const divisionId = '456';
      const result = createOffice(divisionId);
      expect(result).toHaveProperty('id');
      expect(result.divisionId).toBe(divisionId);
    });
  });

  describe('updateInstitution', () => {
    test('should update institution with new data', () => {
      const institutionId = '123';
      const updatedData = { name: 'Updated Institution' };
      const result = updateInstitution(institutionId, updatedData);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(updatedData.name);
    });
  });

  describe('updateDivision', () => {
    test('should update division with new data', () => {
      const divisionId = '456';
      const updatedData = { name: 'Updated Division' };
      const result = updateDivision(divisionId, updatedData);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(updatedData.name);
    });
  });

  describe('updateOffice', () => {
    test('should update office with new data', () => {
      const officeId = '789';
      const updatedData = { name: 'Updated Office' };
      const result = updateOffice(officeId, updatedData);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(updatedData.name);
    });
  });
});
