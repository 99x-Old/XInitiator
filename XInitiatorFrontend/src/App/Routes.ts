import Home from '../components/Home'
import Initiatives from '../components/Initiatives'
import AddInitiative from '../components/Initiatives/AllInitiatives/AddInitiative'
import EditInitiative from '../components/Initiatives/AllInitiatives/EditInitiative'
import AddNewInitiativeYear from '../components/Initiatives/InitiativeByYear/InitiativeYears/AddNewInitiativeYear'
import AddInitiativesForYear from '../components/Initiatives/InitiativeByYear/AddInitiativesForYear'
import EditInitiativeForYear from '../components/Initiatives/InitiativeByYear/EditInitiativeForYear'
import AddMembersToInitiativeByYear from '../components/Initiatives/InitiativeByYear/AddMembersToInitiativeByYear';
import UserList from '../components/User/UserList'
import TestPage from '../components/Test/TestPage'
import UserEdit from '../components/User/UserEdit'
import ViewUser from '../components/User/ViewUser'

export const GetRoutes = () => {

    return[
        {
            path: '/',
            exact: true,
            component: Home,
            accessLevel: 0
        },
        {
            path: '/initiatives',
            exact: true,
            component: Initiatives,
            accessLevel: 4
        },
        {
            path: '/initiatives/add',
            exact: true,
            component: AddInitiative,
            accessLevel: 4
        },
        {
            path: '/initiativeyear/add',
            exact: true,
            component: AddNewInitiativeYear,
            accessLevel: 3
        },
        {
            path: '/initiatives/edit/:id',
            exact: true,
            component: EditInitiative,
            accessLevel: 4
        },
        {
            path: '/initiativebyyear/add',
            exact: true,
            component: AddInitiativesForYear,
            accessLevel: 3
        },
        {
            path: '/initiativesByYear/edit/:id',
            exact: true,
            component: EditInitiativeForYear,
            accessLevel: 3
        },
        {
            path: '/initiativesByYear/addMembers/:id',
            exact: true,
            component: AddMembersToInitiativeByYear,
            accessLevel: 3
        },
        {
            path: '/users',
            exact: true,
            component: UserList,
            accessLevel: 4
        },
        {
            path: '/test',
            exact: true,
            component: TestPage,
            accessLevel: 4
        },
        {
            path: '/users/edit/:id',
            exact: true,
            component: UserEdit,
            accessLevel: 4
        },
        {
            path: '/users/view/:id',
            exact: true,
            component: ViewUser,
            accessLevel: 0
        },
    ]
}