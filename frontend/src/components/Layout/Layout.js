import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Icon from '@mdi/react'
import {
    mdiSettings as SettingsIcon,
    mdiFacebookBox as FacebookIcon,
    mdiTwitterBox as TwitterIcon,
    mdiGithubBox as GithubIcon,
} from '@mdi/js'
import {
    Fab,
    IconButton
} from '@material-ui/core'
import { connect } from 'react-redux';
// styles
import useStyles from './styles'

// components
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Link } from '../Wrappers'
import ColorChangeThemePopper from './components/ColorChangeThemePopper'

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard'
import BreadCrumbs from '../../components/BreadCrumbs'

// context
import { useLayoutState } from '../../context/LayoutContext'

import MenuFormPage from 'pages/CRUD/Menu/form/MenuFormPage';
import MenuTablePage from 'pages/CRUD/Menu/table/MenuTablePage';
import MenuViewPage from 'pages/CRUD/Menu/page/MenuViewPage';

import BillingsFormPage from 'pages/CRUD/Billings/form/BillingsFormPage';
import BillingsTablePage from 'pages/CRUD/Billings/table/BillingsTablePage';
import BillingsViewPage from 'pages/CRUD/Billings/page/BillingsViewPage';

import OrdersFormPage from 'pages/CRUD/Orders/form/OrdersFormPage';
import OrdersTablePage from 'pages/CRUD/Orders/table/OrdersTablePage';
import OrdersViewPage from 'pages/CRUD/Orders/page/OrdersViewPage';

import AdministratorFormPage from 'pages/CRUD/Administrator/form/AdministratorFormPage';
import AdministratorTablePage from 'pages/CRUD/Administrator/table/AdministratorTablePage';
import AdministratorViewPage from 'pages/CRUD/Administrator/page/AdministratorViewPage';

import CompaniesFormPage from 'pages/CRUD/Companies/form/CompaniesFormPage';
import CompaniesTablePage from 'pages/CRUD/Companies/table/CompaniesTablePage';
import CompaniesViewPage from 'pages/CRUD/Companies/page/CompaniesViewPage';

import CustomersFormPage from 'pages/CRUD/Customers/form/CustomersFormPage';
import CustomersTablePage from 'pages/CRUD/Customers/table/CustomersTablePage';
import CustomersViewPage from 'pages/CRUD/Customers/page/CustomersViewPage';

import EmployesFormPage from 'pages/CRUD/Employes/form/EmployesFormPage';
import EmployesTablePage from 'pages/CRUD/Employes/table/EmployesTablePage';
import EmployesViewPage from 'pages/CRUD/Employes/page/EmployesViewPage';

import EventsFormPage from 'pages/CRUD/Events/form/EventsFormPage';
import EventsTablePage from 'pages/CRUD/Events/table/EventsTablePage';
import EventsViewPage from 'pages/CRUD/Events/page/EventsViewPage';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';
import UsersViewPage from 'pages/CRUD/Users/page/UsersViewPage';

function Layout(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'add-section-popover' : undefined
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }

    // global
    let layoutState = useLayoutState()

    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Sidebar />
            <div
                className={classnames(classes.content, {
                    [classes.contentShift]: layoutState.isSidebarOpened,
                })}
            >
                <div className={classes.fakeToolbar} />
                <BreadCrumbs />
                <Switch>

                    <Route path="/admin/dashboard" component={Dashboard} />
                    <Route path="/admin/user/edit" component={EditUser} />

                    <Route path={"/admin/menu"} exact component={MenuTablePage} />
                    <Route path={"/admin/menu/new"} exact component={MenuFormPage} />
                    <Route path={"/admin/menu/:id/edit"} exact component={MenuFormPage} />
                    <Route path={"/admin/menu/:id"} exact component={MenuViewPage} />

                    <Route path={"/admin/billings"} exact component={BillingsTablePage} />
                    <Route path={"/admin/billings/new"} exact component={BillingsFormPage} />
                    <Route path={"/admin/billings/:id/edit"} exact component={BillingsFormPage} />
                    <Route path={"/admin/billings/:id"} exact component={BillingsViewPage} />

                    <Route path={"/admin/orders"} exact component={OrdersTablePage} />
                    <Route path={"/admin/orders/new"} exact component={OrdersFormPage} />
                    <Route path={"/admin/orders/:id/edit"} exact component={OrdersFormPage} />
                    <Route path={"/admin/orders/:id"} exact component={OrdersViewPage} />

                    <Route path={"/admin/administrator"} exact component={AdministratorTablePage} />
                    <Route path={"/admin/administrator/new"} exact component={AdministratorFormPage} />
                    <Route path={"/admin/administrator/:id/edit"} exact component={AdministratorFormPage} />
                    <Route path={"/admin/administrator/:id"} exact component={AdministratorViewPage} />

                    <Route path={"/admin/companies"} exact component={CompaniesTablePage} />
                    <Route path={"/admin/companies/new"} exact component={CompaniesFormPage} />
                    <Route path={"/admin/companies/:id/edit"} exact component={CompaniesFormPage} />
                    <Route path={"/admin/companies/:id"} exact component={CompaniesViewPage} />

                    <Route path={"/admin/customers"} exact component={CustomersTablePage} />
                    <Route path={"/admin/customers/new"} exact component={CustomersFormPage} />
                    <Route path={"/admin/customers/:id/edit"} exact component={CustomersFormPage} />
                    <Route path={"/admin/customers/:id"} exact component={CustomersViewPage} />

                    <Route path={"/admin/employes"} exact component={EmployesTablePage} />
                    <Route path={"/admin/employes/new"} exact component={EmployesFormPage} />
                    <Route path={"/admin/employes/:id/edit"} exact component={EmployesFormPage} />
                    <Route path={"/admin/employes/:id"} exact component={EmployesViewPage} />

                    <Route path={"/admin/events"} exact component={EventsTablePage} />
                    <Route path={"/admin/events/new"} exact component={EventsFormPage} />
                    <Route path={"/admin/events/:id/edit"} exact component={EventsFormPage} />
                    <Route path={"/admin/events/:id"} exact component={EventsViewPage} />

                    <Route path={"/admin/users"} exact component={UsersTablePage} />
                    <Route path={"/admin/users/new"} exact component={UsersFormPage} />
                    <Route path={"/admin/users/:id/edit"} exact component={UsersFormPage} />
                    <Route path={"/admin/users/:id"} exact component={UsersViewPage} />

                </Switch>
                <Fab
                    color="primary"
                    aria-label="settings"
                    onClick={e => handleClick(e)}
                    className={classes.changeThemeFab}
                    style={{ zIndex: 100 }}
                >
                    <Icon path={SettingsIcon} size={1} color="#fff" />
                </Fab>
                <ColorChangeThemePopper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                />
                <Footer>
                    <div>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Flatlogic
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/about'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            About Us
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://flatlogic.com/blog'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Blog
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={'https://www.facebook.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton aria-label="facebook">
                                <Icon
                                    path={FacebookIcon}
                                    size={1}
                                    color="#6E6E6E99"
                                />
                            </IconButton>
                        </Link>
                        <Link
                            href={'https://twitter.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton aria-label="twitter">
                                <Icon
                                    path={TwitterIcon}
                                    size={1}
                                    color="#6E6E6E99"
                                />
                            </IconButton>
                        </Link>
                        <Link
                            href={'https://github.com/flatlogic'}
                            target={'_blank'}
                        >
                            <IconButton
                                aria-label="github"
                                style={{ padding: '12px 0 12px 12px' }}
                            >
                                <Icon
                                    path={GithubIcon}
                                    size={1}
                                    color="#6E6E6E99"
                                />
                            </IconButton>
                        </Link>
                    </div>
                </Footer>
            </div>
        </div>
    )
}

export default withRouter(connect()(Layout))
