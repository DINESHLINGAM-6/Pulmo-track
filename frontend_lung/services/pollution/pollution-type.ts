export interface PollutionData {
    status: string;
    data: {
      aqi: number;
      time: {
        s: string;
      };
      city: {
        name: string;
        url: string;
        geo: string[];
      };
      iaqi: {
        pm25: any;
      };
    };
  }
  
  export interface PollutionStatus {
    label: string;
    color: string;  
    alert: boolean;
  }