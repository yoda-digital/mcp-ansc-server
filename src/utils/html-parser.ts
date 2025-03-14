import * as cheerio from 'cheerio';
import { Appeal, AppealStatus } from '../models/appeals.js';
import { Decision } from '../models/decisions.js';

export class HtmlParser {
  /**
   * Parse appeals table from HTML content
   */
  static parseAppealsTable(html: string): Appeal[] {
    const $ = cheerio.load(html);
    const appeals: Appeal[] = [];

    $('#myTable tbody tr').each((_: number, row: any) => {
      const $row = $(row);
      const $cells = $row.find('td');

      // Skip if row doesn't have enough cells
      if ($cells.length < 10) return;

      // Extract OCDS ID from procedure link
      const procedureLink = $cells.eq(6).find('a').attr('href') || '';
      const procedureNumber = procedureLink.split('/').pop() || '';

      const appeal: Appeal = {
        registrationNumber: $cells.eq(0).text().trim(),
        entryDate: $cells.eq(1).text().trim(),
        exitNumber: $cells.eq(2).text().trim(),
        challenger: $cells.eq(3).text().trim(),
        contractingAuthority: $cells.eq(4).text().trim(),
        complaintObject: $cells.eq(5).text().trim(),
        procedureNumber: procedureNumber,
        procedureType: $cells.eq(7).text().trim(),
        procurementObject: $cells.eq(8).text().trim(),
        status: this.parseAppealStatus($cells.eq(9).text().trim())
      };

      appeals.push(appeal);
    });

    return appeals;
  }

  /**
   * Parse decisions table from HTML content
   */
  static parseDecisionsTable(html: string): Decision[] {
    const $ = cheerio.load(html);
    const decisions: Decision[] = [];

    $('#myTable tbody tr').each((_: number, row: any) => {
      const $row = $(row);
      const $cells = $row.find('td');

      // Skip if row doesn't have enough cells
      if ($cells.length < 6) return;

      // Extract PDF URL from decision link
      const pdfUrl = $cells.eq(4).find('a').attr('href') || '';

      const decision: Decision = {
        date: $cells.eq(0).text().trim(),
        challenger: $cells.eq(1).text().trim(),
        contractingAuthority: $cells.eq(2).text().trim(),
        complaintObject: $cells.eq(3).text().trim(),
        pdfUrl: pdfUrl,
        reportingStatus: $cells.eq(5).text().trim()
      };

      decisions.push(decision);
    });

    return decisions;
  }

  /**
   * Parse appeal status from text to enum
   */
  private static parseAppealStatus(status: string): AppealStatus {
    const statusMap: { [key: string]: AppealStatus } = {
      'Retrasă': AppealStatus.Withdrawn,
      'Număr anulat': AppealStatus.CanceledNumber,
      'În examinare': AppealStatus.UnderReview,
      'Decizie adoptată': AppealStatus.DecisionAdopted,
      'Contestație retrasă': AppealStatus.WithdrawnComplaint,
      'Examinare preliminară': AppealStatus.PreliminaryExamination,
      'În așteptarea dosarului': AppealStatus.AwaitingFile,
      'Restituită spre corectare': AppealStatus.ReturnedForCorrection,
      'Nu ține de competența ANSC': AppealStatus.NotWithinAnscCompetence,
      'În examinare, Procedură suspendată': AppealStatus.UnderReviewProcedureSuspended,
      'În așteptarea explicațiilor de la AC': AppealStatus.AwaitingExplanationsFromCA,
      'Contestație retrasă – motiv neprecizat': AppealStatus.WithdrawnComplaintUnspecified,
      'Contestație retrasă – pentru a nu pereclita activitatea AC': AppealStatus.WithdrawnComplaintNotJeopardizeCA,
      'Contestație retrasă – motivul situației excepționale în țară': AppealStatus.WithdrawnComplaintNationalSituation,
      'In așteptarea dosarului/ În așteptarea explicațiilor de la AC': AppealStatus.AwaitingFileAndExplanations,
      'Contestație retrasă – argumentele AC acceptate de contestator': AppealStatus.WithdrawnComplaintCAArgumentsAccepted,
      'Contestație retrasă – apreciată de contestator ca neîntemeiată': AppealStatus.WithdrawnComplaintUnfounded,
      'Contestație retrasă - procedură anulată, contestație rămasă fără obiect': AppealStatus.WithdrawnComplaintProcedureCanceled,
      'Contestație retrasă – măsuri de remediere efectuate de către AC, contestație rămasă fără obiect': AppealStatus.WithdrawnComplaintRemedialMeasures
    };

    return statusMap[status] || AppealStatus.UnderReview;
  }
}