import { format } from "date-fns";

export const ProfileHtml =({ data, date1, date2 }: {data: any, date1:any, date2: any}) => {
    var datas = "";
    for (let i in data) {
      const item = data[i];
      datas =
        datas +
        `<tr>
        <td>${item[0] ? item[0] : ""}</td>
        <td>${item[1] ? item[1] : ""}</td>
        <td>${item[2] ? item[2] : ""}</td>
        <td>${item[3] ? item[3] : ""}</td>
        <td>${item[4] ? item[4] : ""}</td>
        <td>${item[5] ? item[5] : ""}</td>
      </tr>`;
    }

    const html = `
    <html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #A9A9A9;
      text-align: center;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    </style>
    </head>
    <body>
    
    <img width="20%" src="https://naimaaadmin.com/upload/8alogo.png" alt="">
    <h2>Борлуулалт үр ашгийн тайлан</h2>
    <table style="width:100%">
      <tr>
        <th colspan="6"  >${format(new Date(date1), "yyyy-MM-dd")} наас ${format(new Date(date2), "yyyy-MM-dd")} борлуулалт үр ашгийн тайлан</th>  
      </tr>
      <tr>
<th colspan="2"></th>
<th colspan="3">Борлуулсан</th>
<th colspan="1"></th>
      </tr>
      <tr>
<th>Бараа бүтээгдэхүүний нэр</th>
<th>Нэгжийн дундаж өртөг</th>
<th>Тоо ширхэг</th>
<th>Нэгжийн дундаж үнэ</th>
<th>Нийт үнэ</th>
<th>Нийт ашиг</th>
      </tr>
      ${datas}
     
    </table>
    
    </body>
    </html>
    `;
    return html;
  };

