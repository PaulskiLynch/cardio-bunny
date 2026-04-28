import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'paullynch.ie@gmail.com'
const FROM = 'CrowdLoops <notifications@crowdloops.com>'

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
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New entry pending review — ${competition}`,
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
