import React, { useEffect, useState } from 'react'

const GoogleSheetPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const sheetId = '1AQie60Pj1NjOJ1ipFinsn04Kgk-gLzGlTg-FK28TGPE'
      const apiKey = 'AIzaSyDxjI9iEI-9ZpiWLj9PFU52iKXtJlGjBGY'

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`

      try {
        const response = await fetch(url)
        const result = await response.json()
        const rows = result.values
        const headers = rows[0]
        const dataRows = rows.slice(1)

        const formattedData = dataRows.map((row) =>
          Object.fromEntries(headers.map((key, i) => [key, row[i] || ''])),
        )

        setData(formattedData)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Dados da planilha</h2>
      <div>
        <a
          href='https://www.appsheet.com/start/cf33a55a-7f0e-4a79-a096-b8cbae15c502'
          target="_blank"
        >
          Lista de Clientes Tronsoft
        </a>
        <a 
          href='https://drive.google.com/file/d/1_0VH42WUHi1ereKpnvQ-wvnN7eEbzMId/view'
          target='_blanck'
         >
          Gestor Tronsoft
        </a>
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  )
}

export { GoogleSheetPage }
