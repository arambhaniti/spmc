function doGet(e) {
  return json({
    success: true,
    message: 'Property Inquiry Web App is running'
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

    const required = ['name', 'email', 'phone'];
    required.forEach(field => {
      if (!data[field] || !data[field].trim()) {
        throw new Error(`Missing required field: ${field}`);
      }
    });

    const propertyId = data.propertyId || 'N/A';
    const name = data.name.trim();
    const email = data.email.trim();
    const phone = data.phone.trim();
    const message = data.message ? data.message.trim() : '';
    const propertyTitle = data.propertyTitle || 'Unknown Property';
    const propertyLocation = data.propertyLocation || 'Unknown Location';

    const recordId = saveToSheet({
      propertyId,
      name,
      email,
      phone,
      message,
      propertyTitle,
      propertyLocation
    });

    sendAdminEmail({
      propertyId,
      name,
      email,
      phone,
      message,
      propertyTitle,
      propertyLocation,
      recordId
    });

    sendOwnerEmail({
      propertyId,
      name,
      email,
      phone,
      propertyTitle,
      recordId
    });

    sendUserEmail(name, email, propertyTitle);

    return json({
      success: true,
      recordId,
      message: 'Inquiry submitted successfully'
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
  let ssId = props.getProperty('SPREADSHEET_ID');

  if (!ssId) {
    const ss = SpreadsheetApp.create('Property Inquiries');
    sheet = ss.getActiveSheet();
    sheet.setName('Inquiries');
    props.setProperty('SPREADSHEET_ID', ss.getId());
  } else {
    const ss = SpreadsheetApp.openById(ssId);
    sheet = ss.getSheetByName('Inquiries') || ss.insertSheet('Inquiries');
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Record ID',
      'Property ID',
      'Name',
      'Email',
      'Phone',
      'Property Title',
      'Property Location',
      'Message',
      'Status'
    ]);
  }

  const recordId =
    'PROP-' +
    Date.now() +
    '-' +
    Math.random().toString(36).slice(2, 6).toUpperCase();

  sheet.appendRow([
    new Date(),
    recordId,
    data.propertyId,
    data.name,
    data.email,
    data.phone,
    data.propertyTitle,
    data.propertyLocation,
    data.message,
    'New'
  ]);

  SpreadsheetApp.flush(); // ensures write

  return recordId;
}

/* ================= EMAILS ================= */

function sendAdminEmail(data) {
  const adminEmail =
    PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL') ||
    'info@spmc.ae';

  MailApp.sendEmail({
    to: adminEmail,
    subject: `🏠 New Property Inquiry (${data.recordId})`,
    replyTo: data.email,
    htmlBody: `
      <b>Property ID:</b> ${data.propertyId}<br>
      <b>Property:</b> ${data.propertyTitle}<br>
      <b>Location:</b> ${data.propertyLocation}<br><br>

      <b>Name:</b> ${data.name}<br>
      <b>Email:</b> ${data.email}<br>
      <b>Phone:</b> ${data.phone}<br><br>

      <b>Message:</b><br>
      ${data.message || '—'}
    `
  });
}

function sendOwnerEmail(data) {
  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: `📥 Inquiry saved (${data.recordId})`,
    htmlBody: `
      Inquiry successfully saved in Google Sheets.<br><br>

      <b>Record ID:</b> ${data.recordId}<br>
      <b>Property ID:</b> ${data.propertyId}<br>
      <b>Property:</b> ${data.propertyTitle}<br><br>

      <b>Name:</b> ${data.name}<br>
      <b>Email:</b> ${data.email}<br>
      <b>Phone:</b> ${data.phone}
    `
  });
}

function sendUserEmail(name, email, propertyTitle) {
  MailApp.sendEmail({
    to: email,
    subject: `Thanks for contacting us – ${propertyTitle}`,
    htmlBody: `
      Hi ${name},<br><br>

      Thank you for your interest in <b>${propertyTitle}</b>.<br>
      Our team will contact you shortly.<br><br>

      Regards,<br>
      SPMC Property Team
    `
  });
}
