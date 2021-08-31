import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  api_url: string =
    'https://stagedata.givetech.io/give-tech/api/campaign/603fe725-9a21-4353-87e8-3de2cc0f94b6';

  constructor(private http: HttpClient, private CookieService: CookieService) {}

  getCampaign() {
    if (this.campaignExpired()) {
      return new Promise((resolve, reject) => {
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
    const expAt = moment().add(1, 'months').format();
    this.CookieService.set('campaign_data', JSON.stringify(data));
    this.CookieService.set('campaign_exp', expAt.toString());
  }

  campaignExpired() {
    const cookieData = this.CookieService.getAll();
    if (!cookieData.campaign_data || !cookieData.campaign_exp) {
      return true;
    }

    return moment().format() > cookieData.campaign_exp;
  }
}
