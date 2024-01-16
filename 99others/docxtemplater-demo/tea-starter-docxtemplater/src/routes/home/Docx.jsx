import { Button, Card } from "@tencent/tea-component";
import React from "react";
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun
} from "docx";
import { saveAs } from "file-saver";
export function Docx() {
  const handleDownload = () => {
    const document = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: '盘查报告',
              heading: HeadingLevel.HEADING_1,
              thematicBreak: true
            })
          ]
        }
      ]
    })
    Packer.toBlob(document).then(blob => {
      saveAs(blob, "docx example.docx");
    });
  }
  return <Card>
  <Card.Body>
    <Button onClick={() => handleDownload()}>导出报告(Docx)</Button>
  </Card.Body>
</Card>
}