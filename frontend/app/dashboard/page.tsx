
import Dashboard from './dashboard'
import ProtectedRoute from './protectedRoute'

export default function dashboardpage(){
    return (
        <>
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
        </>
    )
}