import { EditTournamentClient } from "./edit-tournament-client"

interface EditTournamentPageProps {
    params: Promise<{
        id: string
    }>
}

export function generateStaticParams() {
    return [{ id: "1" }]
}

export default async function EditTournamentPage({ params }: EditTournamentPageProps) {
    const { id } = await params

    return <EditTournamentClient id={id} />
}