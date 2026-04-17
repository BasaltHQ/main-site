import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const credentials = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY 
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
    : undefined;

const sesClient = new SESClient({
    region: process.env.SES_REGION || process.env.AWS_REGION || "us-west-2",
    ...(credentials ? { credentials } : {})
});

let FROM_ADDRESS = process.env.SES_FROM_ADDRESS || "BasaltCRM <sysadm@basalthq.com>";
if ((FROM_ADDRESS.startsWith('"') && FROM_ADDRESS.endsWith('"')) || (FROM_ADDRESS.startsWith("'") && FROM_ADDRESS.endsWith("'"))) {
    FROM_ADDRESS = FROM_ADDRESS.substring(1, FROM_ADDRESS.length - 1);
}

export async function sendEmail(to: string, subject: string, htmlBody: string): Promise<{ success: boolean; error?: string }> {
    try {
        const command = new SendEmailCommand({
            Destination: { ToAddresses: [to] },
            Message: {
                Body: { Html: { Charset: "UTF-8", Data: htmlBody } },
                Subject: { Charset: "UTF-8", Data: subject }
            },
            Source: FROM_ADDRESS
        });

        const response = await sesClient.send(command);
        console.log(`Email sent to ${to}. Message ID:`, response.MessageId);
        return { success: true };
    } catch (error: any) {
        console.error(`Failed to send email to ${to}:`, error);
        return { success: false, error: error.message || String(error) };
    }
}

export async function sendPasswordResetEmail(to: string, token: string) {
    // In production, NEXT_PUBLIC_SITE_URL or request origin would be better,
    // assuming standard Nexus url scheme.
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/nexus/reset-password?token=${token}`;
    
    const subject = "Password Reset - Basalt Nexus";
    const body = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>Reset Your Password</h2>
            <p>You requested a password reset for your Basalt Nexus account.</p>
            <p>Please click the link below to securely reset your password. This link will expire in 2 hours.</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #119dff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">If you did not request this, please ignore this email.</p>
        </div>
    `;
    
    return sendEmail(to, subject, body);
}

export async function sendAccreditationUpdateEmail(to: string, status: string, notes?: string) {
    const subject = `Accreditation Review Update: ${status.toUpperCase()}`;
    
    const body = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>Accreditation Review Status Update</h2>
            <p>Your accreditation status has been updated to: <strong>${status}</strong>.</p>
            ${notes ? `<p><strong>Administrator Notes:</strong> ${notes}</p>` : ''}
            <p>Please log in to your Basalt Nexus dashboard to view details and proceed.</p>
        </div>
    `;
    
    return sendEmail(to, subject, body);
}

export async function sendProposalNotificationEmail(to: string, title: string) {
    const subject = `New Governance Proposal: ${title}`;
    
    const body = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>New Governance Proposal Requires Your Attention</h2>
            <p>A new proposal titled <strong>"${title}"</strong> has been published on the Cap Table and Governance module.</p>
            <p>Please visit the Basalt Nexus Cap Table dashboard to review the dilution impact and cast your vote.</p>
        </div>
    `;
    
    return sendEmail(to, subject, body);
}
