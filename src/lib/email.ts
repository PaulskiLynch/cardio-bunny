import { Resend } from 'resend'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'paullynch.ie@gmail.com'
const FROM = 'CrowdLoops <noreply@crowdloops.com>'

export async function notifyNewEntry({
  entryId,
  designerName,
  competition,
  setName,
}: {
  entryId: string
  designerName: string
  competition: string
  setName: string
}) {
  if (!process.env.RESEND_API_KEY) return
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New entry pending review - ${competition}`,
    html: `
      <p><strong>New submission on CrowdLoops</strong></p>
      <table>
        <tr><td><strong>Entry ID</strong></td><td>${entryId}</td></tr>
        <tr><td><strong>Designer</strong></td><td>${designerName}</td></tr>
        <tr><td><strong>Set Name</strong></td><td>${setName}</td></tr>
        <tr><td><strong>Competition</strong></td><td>${competition}</td></tr>
      </table>
      <p><a href="https://crowdloops.com/admin">Review in Admin →</a></p>
    `,
  }).catch(() => { /* don't let email failure block the submission */ })
}

export async function notifyEntryDecision({
  to,
  designerName,
  setName,
  competition,
  status,
}: {
  to: string
  designerName: string
  setName: string
  competition: string
  status: 'approved' | 'rejected'
}) {
  if (!process.env.RESEND_API_KEY) return
  const resend = new Resend(process.env.RESEND_API_KEY)
  const approved = status === 'approved'
  await resend.emails.send({
    from: FROM,
    to,
    subject: approved
      ? `Your entry has been approved — ${competition}`
      : `Update on your entry — ${competition}`,
    html: approved ? `
      <p>Hi ${designerName},</p>
      <p>Great news — your entry <strong>${setName}</strong> has been <strong>approved</strong> for the ${competition} competition and is now live for voting!</p>
      <p><a href="https://crowdloops.com/loops/${competition}">View the competition →</a></p>
      <p>Good luck!</p>
      <p>— The CrowdLoops Team</p>
    ` : `
      <p>Hi ${designerName},</p>
      <p>Thank you for submitting <strong>${setName}</strong> to the ${competition} competition.</p>
      <p>After review, your entry was not selected to move forward this time. We hope you'll join us again in future competitions.</p>
      <p>— The CrowdLoops Team</p>
    `,
  }).catch(() => {})
}
