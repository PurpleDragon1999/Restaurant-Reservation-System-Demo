interface tables_data {
    id: number,
    table_size: number,
    location: string,
    timeReserved: time_slots[]
}

interface time_slots {
    start: string,
    end: string
}

let tables: tables_data[] = [
    {
        id: 1,
        table_size: 2,
        location: 'Corner',
        timeReserved: [
            {
                start: '10:30',
                end: '12:00'
            }
        ]
    },
    {
        id: 2,
        table_size: 2,
        location: 'Center',
        timeReserved: []
    },
    {
        id: 3,
        table_size: 3,
        location: 'Corner',
        timeReserved: []
    },
    {
        id: 4,
        table_size: 3,
        location: 'Center',
        timeReserved: []
    }
];

export { tables_data, time_slots, tables };