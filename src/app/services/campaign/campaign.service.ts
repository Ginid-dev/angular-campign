import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  // The API URL used for making HTTP request to the server
  api_url: string =
    'https://stagedata.givetech.io/give-tech/api/campaign/603fe725-9a21-4353-87e8-3de2cc0f94b6';

  constructor(private http: HttpClient, private CookieService: CookieService) {}

  /**
   * Get the data either from cookies or by requesting data from the server
   */
  getCampaign() {
    // Check if capaign data is expired or if exist in cookies
    if (this.campaignExpired()) {
      return new Promise((resolve, reject) => {
        /**
         * Here Angular use the Observeable for making HTTP requests
         * Observerable need to be subscribed to execute the code
         * every Observerable has two parameters first one is response and second is error
         * We have wrapped Observeable inside the promise so that We can make API call in a sequence.
         */
        this.http.get(this.api_url).subscribe(
          (res: any) => {
            this.saveCampaign(res);
            resolve(res);
          },
          (err: any) => {
            reject(err);
          }
        );
      });
    } else {
      return new Promise((resolve) =>
        resolve(JSON.parse(this.CookieService.get('campaign_data')))
      );
    }
  }

  saveCampaign(data: any): void {
    /**
     * Save the HTTP response data in the cookies also save the expire time of cookies
     * Here we are using CookieSerice to make easy to store and get Cookies.
     */
    const expAt = moment().add(1, 'months').format();
    this.CookieService.set('campaign_data', JSON.stringify(data));
    this.CookieService.set('campaign_exp', expAt.toString());
  }

  campaignExpired() {
    /**
     * Fist check if the campaign data is exist in the cookies then check if the expire date
     * time is greater then the current time.
     */
    const cookieData = this.CookieService.getAll();
    if (!cookieData.campaign_data || !cookieData.campaign_exp) {
      return true;
    }

    return moment().format() > cookieData.campaign_exp;
  }
}
