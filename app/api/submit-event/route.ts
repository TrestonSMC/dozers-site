import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      dateRange,
      startTime,
      endTime,
      daysOfWeek,
      eventType,
      notes,
      requestedBy,
      requestDate,
      phone,
      email,
      tableSize,
      numberOfTables,
      estimatedAttendance,
      greenFees,
      specialRequest,
    } = body;

    const { error } = await resend.emails.send({
      from: process.env.EVENT_FROM_EMAIL!,
      to: process.env.EVENT_TO_EMAIL!,
      subject: `New Event Submission — ${requestedBy}`,
      replyTo: email || undefined,
      text: `
NEW EVENT SUBMISSION

Date/Range: ${dateRange}
Start Time: ${startTime}
End Time: ${endTime}
Days of Week: ${daysOfWeek}

Type: ${eventType}

Requested By: ${requestedBy}
Request Date: ${requestDate}
Phone: ${phone}
Email: ${email}

Tables Needed: ${tableSize}
Number of Tables: ${numberOfTables}
Estimated Attendance: ${estimatedAttendance}
Green Fees: ${greenFees}

Notes:
${notes}

Special Request:
${specialRequest}
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
