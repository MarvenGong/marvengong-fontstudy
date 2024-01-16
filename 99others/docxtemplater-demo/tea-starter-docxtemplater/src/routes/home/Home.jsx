import React from "react";
import { Layout, ExternalLink, Card, Button } from "@tencent/tea-component";
import docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import JSZipUtils from 'jszip-utils';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { Docx } from "./Docx";
const { Body, Content } = Layout;

export function Home() {
  const handleDownload = () => {
    // JSZipUtils.getBinaryContent(
    //   "examples/html-block-example.docx",
    //   function (error, content) {
    //       if (error) {
    //           console.error(error);
    //           return;
    //       }

    //       var zip = new PizZip(content);
    //       var doc = new docxtemplater(zip, {
    //           modules: [new DocxtemplaterHtmlModule({})],
    //       });

    //       doc.render({
    //           html: "<p>Hello <b>John</b></p>",
    //       });
    //       var out = doc.getZip().generate({
    //           type: "blob",
    //           mimeType:
    //               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //       });
    //       saveAs(out, "generated.docx");
    //   }
      
    // );
    const content = ` <h1 style="height: 300px;text-align: center; font-size: 36px;margin-bottom: 300px">盘查报告</h1>
    <h2>This is an about page</h2>
    <table style="border-collapse: collapse;">
    <tr><th>aaa</th></tr>
    <tr><td>bbbb</td></tr>
    </table>`
    var page = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' + content + '</body></html>'
    var converted = htmlDocx.asBlob(page);
    // 用 FielSaver.js里的保存方法 进行输出
    saveAs(converted, 'html-docx-js test.docx');
  }
  return (
    <Body>
      <Content>
        <Content.Header
          title="Home"
          operation={<ExternalLink weak>Home</ExternalLink>}
        ></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body>
              <Button onClick={() => handleDownload()}>导出报告</Button>
            </Card.Body>
          </Card>
          <Docx />
        </Content.Body>
      </Content>
    </Body>
  );
}
