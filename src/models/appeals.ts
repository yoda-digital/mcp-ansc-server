export interface Appeal {
  registrationNumber: string;  // e.g. '02/279/25'
  entryDate: string;          // e.g. '13/03/2025'
  exitNumber: string;
  challenger: string;
  contractingAuthority: string;
  complaintObject: string;
  procedureNumber: string;     // OCDS ID e.g. 'ocds-b3wdp1-MD-1740472744894'
  procedureType: string;
  procurementObject: string;
  status: AppealStatus;
}

export interface AppealSearchParams {
  year?: number;              // Optional, defaults to current year
  authority?: string;
  challenger?: string;
  procedureNumber?: string;   // OCDS ID
  status?: AppealStatus;
}

export enum AppealStatus {
  Withdrawn = 1,
  CanceledNumber = 2,
  UnderReview = 3,
  DecisionAdopted = 4,
  WithdrawnComplaint = 5,
  PreliminaryExamination = 6,
  AwaitingFile = 7,
  ReturnedForCorrection = 8,
  NotWithinAnscCompetence = 9,
  UnderReviewProcedureSuspended = 10,
  AwaitingExplanationsFromCA = 11,
  WithdrawnComplaintUnspecified = 12,
  WithdrawnComplaintNotJeopardizeCA = 13,
  WithdrawnComplaintNationalSituation = 14,
  AwaitingFileAndExplanations = 15,
  WithdrawnComplaintCAArgumentsAccepted = 16,
  WithdrawnComplaintUnfounded = 17,
  WithdrawnComplaintProcedureCanceled = 18,
  WithdrawnComplaintRemedialMeasures = 19
}