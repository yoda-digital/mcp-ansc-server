import axios, { AxiosInstance } from 'axios';
import { Appeal, AppealSearchParams } from '../models/appeals.js';
import { Decision, DecisionSearchParams } from '../models/decisions.js';
import { HtmlParser } from '../utils/html-parser.js';

export class AnscClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://www.ansc.md',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
  }

  /**
   * Search appeals with optional filters
   */
  async searchAppeals(params: AppealSearchParams): Promise<Appeal[]> {
    const year = params.year || new Date().getFullYear();
    const queryParams = new URLSearchParams();

    if (params.authority) {
      queryParams.append('AutoritateaContractanta', params.authority);
    }
    if (params.challenger) {
      queryParams.append('Contestatar', params.challenger);
    }
    if (params.procedureNumber) {
      // Add quotes around procedure number as required by ANSC
      queryParams.append('NrProcedurii', `"${params.procedureNumber}"`);
    }
    if (params.status) {
      queryParams.append('solr_document', params.status.toString());
    }

    const url = `/ro/contestatii/${year}?${queryParams.toString()}`;
    
    try {
      const response = await this.axiosInstance.get(url);
      return HtmlParser.parseAppealsTable(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch appeals: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Search decisions with optional filters
   */
  async searchDecisions(params: DecisionSearchParams): Promise<Decision[]> {
    const year = params.year || new Date().getFullYear();
    const queryParams = new URLSearchParams();

    if (params.challenger) {
      queryParams.append('Contestatar', params.challenger);
    }
    if (params.authority) {
      // Add quotes around authority as required by ANSC
      queryParams.append('AutoritateaContractanta', `"${params.authority}"`);
    }
    if (params.procurementObject) {
      queryParams.append('ObiectulAchizitiei', params.procurementObject);
    }
    if (params.decisionStatus?.length) {
      params.decisionStatus.forEach(status => {
        queryParams.append('solr_document_1', status.toString());
      });
    }
    if (params.decisionContent?.length) {
      params.decisionContent.forEach(content => {
        queryParams.append('solr_document_2', content.toString());
      });
    }
    if (params.appealGrounds?.length) {
      params.appealGrounds.forEach(ground => {
        queryParams.append('solr_document_3[]', ground.toString());
      });
    }
    if (params.complaintObject) {
      queryParams.append('solr_document_4', params.complaintObject.toString());
    }
    if (params.appealNumber) {
      queryParams.append('solr_document_8', params.appealNumber);
    }

    const url = `/ro/content/decizii-${year}?${queryParams.toString()}`;
    
    try {
      const response = await this.axiosInstance.get(url);
      return HtmlParser.parseDecisionsTable(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch decisions: ${error.message}`);
      }
      throw error;
    }
  }
}