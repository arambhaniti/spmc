function doGet(e) {
  return json({
    success: true,
    message: 'Contact Form Web App is running'
  });
}

function doPost(e) {
  try {
    if (!e) {
      throw new Error('No request object received');
    }
    
    if (!e.parameter) {
      throw new Error('No form data received in request parameters');
    }

    const data = e.parameter;

    const required = ['firstName', 'lastName', 'email'];
    required.forEach(field => {
      if (!data[field] || !data[field].trim()) {
        throw new Error(`Missing required field: ${field}`);
      }
    });

    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    const email = data.email.trim();
    const phone = data.phone ? data.phone.trim() : '';
    const subject = data.subject ? data.subject.trim() : 'General Inquiry';
    const message = data.message ? data.message.trim() : '';

    const recordId = saveToSheet({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    });

    sendAdminEmail({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      recordId
    });

    sendOwnerEmail({
      firstName,
      lastName,
      email,
      subject,
      recordId
    });

    sendUserEmail(firstName, email, subject);

    return json({
      success: true,
      recordId,
      message: 'Contact form submitted successfully'
    });

  } catch (err) {
    return json({
      success: false,
      message: err.message || 'Server error',
      error: err.toString(),
      timestamp: new Date().toISOString()
    });
  }
}

/* ================= RESPONSE ================= */

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ================= GOOGLE SHEET ================= */

function saveToSheet(data) {
  const props = PropertiesService.getScriptProperties();
  let sheet;
  let ssId = props.getProperty('CONTACT_SPREADSHEET_ID');

  if (!ssId) {
    const ss = SpreadsheetApp.create('Contact Form Submissions');
    sheet = ss.getActiveSheet();
    sheet.setName('Contact Submissions');
    props.setProperty('CONTACT_SPREADSHEET_ID', ss.getId());
  } else {
    const ss = SpreadsheetApp.openById(ssId);
    sheet = ss.getSheetByName('Contact Submissions') || ss.insertSheet('Contact Submissions');
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Record ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Subject',
      'Message',
      'Status'
    ]);
  }

  const recordId =
    'CONTACT-' +
    Date.now() +
    '-' +
    Math.random().toString(36).slice(2, 6).toUpperCase();

  sheet.appendRow([
    new Date(),
    recordId,
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.subject,
    data.message,
    'New'
  ]);

  SpreadsheetApp.flush();

  return recordId;
}

/* ================= EMAILS ================= */

function sendAdminEmail(data) {
  const adminEmail =
    PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL') ||
    'info@spmc.ae';

  MailApp.sendEmail({
    to: adminEmail,
    subject: `📧 New Contact Form Submission (${data.recordId})`,
    replyTo: data.email,
    htmlBody: `
      <b>Subject:</b> ${data.subject}<br><br>

      <b>Name:</b> ${data.firstName} ${data.lastName}<br>
      <b>Email:</b> ${data.email}<br>
      <b>Phone:</b> ${data.phone || 'Not provided'}<br><br>

      <b>Message:</b><br>
      ${data.message || '—'}
    `
  });
}

function sendOwnerEmail(data) {
  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: `📥 Contact submission saved (${data.recordId})`,
    htmlBody: `
      Contact form submission successfully saved in Google Sheets.<br><br>

      <b>Record ID:</b> ${data.recordId}<br>
      <b>Subject:</b> ${data.subject}<br><br>

      <b>Name:</b> ${data.firstName} ${data.lastName}<br>
      <b>Email:</b> ${data.email}<br>
      <b>Phone:</b> ${data.phone || 'Not provided'}
    `
  });
}

function sendUserEmail(firstName, email, subject) {
  MailApp.sendEmail({
    to: email,
    subject: `Thank you for contacting us - SPMC`,
    htmlBody: `
      Hi ${firstName},<br><br>

      Thank you for contacting SPMC. We have received your inquiry regarding <b>${subject}</b>.<br>
      Our team will review your message and get back to you within 12 business hours.<br><br>

      If you have any urgent questions, please call us at +971 4 XXX XXXX.<br><br>

      Regards,<br>
      SPMC Team
    `
  });
}
