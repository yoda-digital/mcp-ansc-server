export interface Decision {
  date: string;
  challenger: string;
  contractingAuthority: string;
  complaintObject: string;
  pdfUrl: string;             // e.g. 'https://elo.ansc.md/DownloadDocs/DownloadFileServlet?id=103491'
  reportingStatus: string;    // Free text status
}

export interface DecisionSearchParams {
  year?: number;              // Optional, defaults to current year
  authority?: string;
  challenger?: string;
  procurementObject?: string;
  decisionStatus?: DecisionStatus[];
  decisionContent?: DecisionContent[];
  appealGrounds?: AppealGrounds[];
  complaintObject?: ComplaintObject;
  appealNumber?: string;
}

export enum DecisionStatus {
  InForce = 1,
  CanceledByCourt = 2,
  SuspendedByCourt = 3
}

export enum DecisionContent {
  ComplaintUpheld = 1,
  ProcedureCanceled = 2,
  ProcedurePartiallyCanceled = 3,
  RemedialMeasures = 4,
  ComplaintRejected = 5,
  ComplaintSubmittedLate = 6,
  ComplaintNonCompliant = 7,
  ComplaintUnfounded = 8,
  ComplaintPartiallyUpheld = 9
}

export enum ComplaintObject {
  AwardDocumentation = 1,
  ProcedureResults = 6
}

export enum AppealGrounds {
  // Rejection of offers (RP)
  RejectionNonCompliantUnacceptable = 1,
  RejectionUnacceptableRequirements = 2,
  RejectionUnacceptableBudget = 3,
  RejectionNonCompliantTechnical = 4,
  RejectionBidGuarantee = 5,
  RejectionAbnormallyLowPrice = 6,
  RejectionWithoutClarification = 7,
  RejectionLateDocuments = 8,
  RejectionModifiedContent = 9,
  RejectionProposalContentChange = 10,
  RejectionScoringEvaluation = 11,
  RejectionIrrelevant = 12,
  RejectionIncorrectForms = 13,

  // Acceptance of other offers (RP)
  AcceptanceNonCompliant = 14,
  AcceptanceQualificationRequirements = 15,
  AcceptanceTechnicalRequirements = 16,
  AcceptanceBidGuarantee = 17,
  AcceptanceAbnormallyLowPrice = 18,
  AcceptanceTechnicalModification = 19,
  AcceptanceFinancialModification = 20,
  AcceptanceScoringEvaluation = 21,
  AcceptanceIncorrectForms = 22,

  // Other grounds (RP)
  NoResultInformation = 23,
  UnjustifiedCancellation = 24,
  TechnicalErrors = 25,
  Other = 26,

  // Documentation requirements (DA)
  RestrictivePersonalRequirements = 27,
  RestrictiveFinancialRequirements = 28,
  RestrictiveCashRequirements = 29,
  RestrictiveTurnoverRequirements = 30,
  RestrictiveTechnicalRequirements = 31,
  RestrictiveSimilarExperience = 32,
  RestrictiveQualityStandards = 33,
  RestrictiveTechnicalSpecs = 34,
  NonTransparentEvaluation = 35,
  SpecificBrands = 36,
  UnclearResponses = 37,
  BidGuaranteeForm = 38,
  UnfairContractClauses = 39,
  NoLotDivision = 40,
  IncompleteDocumentation = 41,
  OtherDocumentation = 42
}