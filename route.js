async function handler({ name, email, message, formType }) {
  if (!name || !email || !message) {
    return {
      error: "Please provide name, email, and message",
    };
  }

  let subject, emailBody;

  if (formType === "join") {
    subject = "New Choir Join Request - Njura Ambassadors";
    emailBody = `
New Join Request:
Name: ${name}
Email: ${email}
Musical Experience: ${message}`;
  } else {
    subject = "New Contact Form Message - Njura Ambassadors";
    emailBody = `
New Contact Message:
Name: ${name}
Email: ${email}
Message: ${message}`;
  }

  try {
    const response = await fetch("https://api.create.xyz/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CREATE_API_KEY}`,
      },
      body: JSON.stringify({
        to: "njuraambassadorssdachoir@gmail.com",
        from: "no-reply@njuraambassadors.com",
        subject,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return {
      success: true,
      message:
        formType === "join"
          ? "Thank you for your interest! We'll contact you soon."
          : "Thank you for your message! We'll get back to you shortly.",
    };
  } catch (error) {
    return {
      error: "Failed to send email. Please try again later.",
    };
  }
}