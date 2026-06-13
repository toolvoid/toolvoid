'use client'

import { ResumeBuilderUI } from './components/ResumBuilderUI'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * PDF Generation Hook
 */
async function generatePDF(resumeData) {
  try {
    // Create a temporary container with the resume
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.width = '210mm'
    container.style.height = '297mm'
    container.style.background = 'white'
    container.style.fontFamily = 'serif'
    container.style.padding = '20mm'
    container.style.fontSize = '12px'

    // Build resume HTML
    let html = `
      <div style="line-height: 1.6; color: #1f2937;">
        <div style="border-bottom: 2px solid #cbd5e1; padding-bottom: 12px; margin-bottom: 16px;">
          <h1 style="margin: 0; font-size: 24px; font-weight: bold;">
            ${resumeData.personal.firstName} ${resumeData.personal.lastName}
          </h1>
    `

    if (resumeData.personal.title) {
      html += `<p style="margin: 4px 0 0 0; font-weight: 600; font-size: 14px; color: #475569;">
        ${resumeData.personal.title}
      </p>`
    }

    // Contact info
    const contactInfo = []
    if (resumeData.personal.email) contactInfo.push(resumeData.personal.email)
    if (resumeData.personal.phone) contactInfo.push(resumeData.personal.phone)
    if (resumeData.personal.location) contactInfo.push(resumeData.personal.location)

    if (contactInfo.length > 0) {
      html += `<p style="margin: 8px 0 0 0; font-size: 11px; color: #64748b;">
        ${contactInfo.join(' • ')}
      </p>`
    }

    html += `</div>`

    // Summary
    if (resumeData.personal.summary) {
      html += `
        <div style="margin-bottom: 12px;">
          <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #1f2937;">
            ${resumeData.personal.summary}
          </p>
        </div>
      `
    }

    // Experience
    if (resumeData.experience.length > 0) {
      html += `
        <div style="margin-bottom: 12px;">
          <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
            Experience
          </h2>
      `
      resumeData.experience.forEach(exp => {
        html += `
          <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="font-weight: bold; font-size: 11px;">${exp.position}</span>
              <span style="font-size: 10px; color: #64748b;">
                ${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            <p style="margin: 2px 0; font-size: 10px; color: #64748b;">${exp.company}</p>
            <p style="margin: 4px 0 0 0; font-size: 10px; line-height: 1.5; color: #1f2937;">
              ${exp.description.replace(/\n/g, '<br />')}
            </p>
          </div>
        `
      })
      html += `</div>`
    }

    // Education
    if (resumeData.education.length > 0) {
      html += `
        <div style="margin-bottom: 12px;">
          <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
            Education
          </h2>
      `
      resumeData.education.forEach(edu => {
        html += `
          <div style="margin-bottom: 6px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="font-weight: bold; font-size: 11px;">${edu.degree}</span>
              <span style="font-size: 10px; color: #64748b;">${edu.graduationYear}</span>
            </div>
            <p style="margin: 2px 0; font-size: 10px; color: #64748b;">${edu.school}</p>
            <p style="margin: 2px 0; font-size: 10px; color: #1f2937;">${edu.field}</p>
          </div>
        `
      })
      html += `</div>`
    }

    // Skills
    if (resumeData.skills.length > 0) {
      html += `
        <div>
          <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
            Skills
          </h2>
      `
      resumeData.skills.forEach(skillGroup => {
        if (skillGroup.items && skillGroup.items.length > 0) {
          html += `
            <div style="margin-bottom: 4px; font-size: 10px;">
              <span style="font-weight: bold;">${skillGroup.category}:</span>
              <span style="color: #1f2937;">${skillGroup.items.join(', ')}</span>
            </div>
          `
        }
      })
      html += `</div>`
    }

    html += `</div>`

    container.innerHTML = html
    document.body.appendChild(container)

    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 210
    const imgHeight = 297
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

    // Download
    const fileName = `${resumeData.personal.firstName || 'Resume'}_${resumeData.personal.lastName || 'Resume'}.pdf`
    pdf.save(fileName)

    // Cleanup
    document.body.removeChild(container)

    return { success: true, message: 'Resume downloaded successfully' }
  } catch (error) {
    console.error('PDF generation error:', error)
    throw new Error('Failed to generate PDF')
  }
}

/**
 * Main Resume Builder Page Component
 */
export default function ResumeBuilderPage() {
  return (
    <ResumeBuilderUI
      onDownloadPDF={generatePDF}
    />
  )
}
