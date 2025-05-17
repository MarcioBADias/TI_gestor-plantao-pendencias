import React from 'react'

const generateDays = () => {
  const days = []

  for (let i = 0; i < firstDayOfMonth; i++)
    days.push(<div key={`empty-${i}`} />)

  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = new Date(year, month, day)
    const dateKey = fullDate.toISOString().split('T')[0]
    const dayData = techPerDay[dateKey] || {}
    const isEditing = editingDate === dateKey
    const isChecked = dayData.checked === true
    const currentTech =
      technicians.find((t) => t.id === dayData.id_tech)?.display_name ||
      'Selecione um técnico'

    days.push(
      <Day
        key={dateKey}
        hasTech={isChecked}
        onClick={() =>
          onClickedDay({ currentDate: fullDate, technician: currentTech })
        }
      >
        {day}
        {isEditing ? (
          <select
            value={dayData.id_tech || ''}
            onChange={(e) => handleTechChange(dateKey, e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="" disabled>
              Selecione
            </option>
            {technicians.map((t) => (
              <option key={t.id} value={t.id}>
                {t.display_name}
              </option>
            ))}
          </select>
        ) : (
          <>
            <p>
              Técnico: <strong>{currentTech}</strong>
            </p>
            <FiEdit3
              onClick={(e) => {
                e.stopPropagation()
                dispatch({ type: 'SET_EDITING_DATE', payload: dateKey })
              }}
            />
            <FiCheckSquare
              onClick={async (e) => {
                e.stopPropagation()
                await supabase.from('plantoes').upsert(
                  [
                    {
                      data: dateKey,
                      id_tecnico: dayData.id_tech,
                      checked: !isChecked,
                    },
                  ],
                  { onConflict: ['data'] },
                )
                await fetchPlantaoData()
              }}
            />
          </>
        )}
      </Day>,
    )
  }

  return days
}
