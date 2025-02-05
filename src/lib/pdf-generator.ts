import { Table } from "@tanstack/react-table"

export function generatePDF<TData>(table: Table<TData>) {
    const pdfContainer = document.createElement("div")
    pdfContainer.className = "print-content"

    // Logo ve başlık bölümü
    const header = document.createElement("div")
    header.className = "print-header"
    header.innerHTML = `
        <div class="header-content">
            <div class="logo">⚽</div>
            <h1 class="brand">Football Academy</h1>
            <div class="metadata-grid">
                <div class="metadata-item">
                    <span class="metadata-label">Toplam Kayıt</span>
                    <span class="metadata-value">${table.getFilteredRowModel().rows.length}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Seçili Kayıt</span>
                    <span class="metadata-value">${table.getFilteredSelectedRowModel().rows.length}</span>
                </div>
            </div>
        </div>
    `
    pdfContainer.appendChild(header)

    // Card container
    const cardsContainer = document.createElement("div")
    cardsContainer.className = "cards-container"

    // Kartları oluştur
    table.getFilteredRowModel().rows.forEach(row => {
        const card = document.createElement("div")
        card.className = "data-card"

        const cardContent = document.createElement("div")
        cardContent.className = "card-content"

        table.getAllColumns()
            .filter(column => column.getCanHide() && column.id !== "select" && column.id !== "actions")
            .forEach(column => {
                const field = document.createElement("div")
                field.className = "card-field"
                const value = row.getValue(column.id)

                field.innerHTML = `
                    <span class="field-label">${column.id}</span>
                    <span class="field-value">${value !== null && value !== undefined ? String(value) : ""}</span>
                `
                cardContent.appendChild(field)
            })

        card.appendChild(cardContent)
        cardsContainer.appendChild(card)
    })

    pdfContainer.appendChild(cardsContainer)

    // Alt bilgi
    const footer = document.createElement("div")
    footer.className = "print-footer"
    footer.innerHTML = `
        <div class="footer-content">
            <p class="copyright">© ${new Date().getFullYear()} Football Academy</p>
            <p class="generation-time">Oluşturulma: ${new Date().toLocaleString('tr-TR')}</p>
        </div>
    `
    pdfContainer.appendChild(footer)

    // Yazdırma için yeni bir pencere aç
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
        alert('Lütfen popup engelleyiciyi devre dışı bırakın ve tekrar deneyin.')
        return
    }

    // Yazdırma penceresine stil ve içerik ekle
    printWindow.document.write(`
        <html>
            <head>
                <title>Veri Tablosu Raporu - Football Academy</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    
                    @media print {
                        @page {
                            size: A4;
                            margin: 15mm;
                        }

                        body {
                            font-family: 'Inter', system-ui, -apple-system, sans-serif;
                            line-height: 1.5;
                            color: #111827;
                            background: #ffffff;
                            margin: 0;
                            padding: 0;
                        }

                        .print-content {
                            max-width: 100%;
                            margin: 0 auto;
                        }

                        /* Header Styles */
                        .print-header {
                            margin-bottom: 2rem;
                            text-align: center;
                            padding-bottom: 2rem;
                            border-bottom: 2px solid #e5e7eb;
                        }

                        .header-content {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 1rem;
                        }

                        .logo {
                            font-size: 2.5rem;
                            color: #2563eb;
                        }

                        .brand {
                            font-size: 2rem;
                            font-weight: 700;
                            color: #1f2937;
                            margin: 0;
                        }

                        .metadata-grid {
                            display: flex;
                            gap: 3rem;
                            margin-top: 1rem;
                        }

                        .metadata-item {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 0.5rem;
                        }

                        .metadata-label {
                            font-size: 0.875rem;
                            font-weight: 500;
                            color: #6b7280;
                        }

                        .metadata-value {
                            font-size: 1.25rem;
                            font-weight: 600;
                            color: #111827;
                        }

                        /* Cards Styles */
                        .cards-container {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 1.5rem;
                            margin: 2rem 0;
                        }

                        .data-card {
                            border: 1px solid #e5e7eb;
                            border-radius: 0.5rem;
                            padding: 1.5rem;
                            background: #ffffff;
                            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
                            page-break-inside: avoid;
                        }

                        .card-content {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 1rem;
                        }

                        .card-field {
                            display: flex;
                            flex-direction: column;
                            gap: 0.25rem;
                        }

                        .field-label {
                            font-size: 0.75rem;
                            font-weight: 500;
                            color: #6b7280;
                            text-transform: uppercase;
                        }

                        .field-value {
                            font-size: 0.875rem;
                            font-weight: 500;
                            color: #111827;
                        }

                        /* Footer Styles */
                        .print-footer {
                            margin-top: 2rem;
                            padding-top: 1rem;
                            border-top: 2px solid #e5e7eb;
                            text-align: center;
                        }

                        .footer-content {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 0.5rem;
                            font-size: 0.75rem;
                            color: #6b7280;
                        }

                        .footer-content p {
                            margin: 0;
                        }

                        .copyright {
                            font-weight: 500;
                        }

                        .generation-time {
                            font-style: italic;
                        }

                        @page {
                            @bottom-right {
                                content: "Sayfa " counter(page) " / " counter(pages);
                                font-size: 0.75rem;
                                color: #6b7280;
                            }
                        }
                    }
                </style>
            </head>
            <body>
                ${pdfContainer.outerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function() {
                            window.close();
                        };
                    };
                </script>
            </body>
        </html>
    `)
    printWindow.document.close()
} 