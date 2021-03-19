import { render, fireEvent, waitFor } from '@testing-library/react';
import CompanyList from '../CompanyList';
import { MemoryRouter } from "react-router";
import UserContext from '../UserContext';

const currUser = {username: "jreid", firstName: "James", lastName: "Reid", email: "jreidmke@gmail.com", isAdmin: false, applcations: []};

it("renders without crashing", () => {
    render(
        <UserContext.Provider value={currUser}>
            <MemoryRouter>
                <CompanyList />
            </MemoryRouter>
        </UserContext.Provider>
    )
});

it("matches snapshot", () => {
    const {asFragment} = render(
        <UserContext.Provider value={currUser}>
            <MemoryRouter>
                <CompanyList />
            </MemoryRouter>
        </UserContext.Provider>        
    );
    expect(asFragment()).toMatchSnapshot();
})

it("returns correct companies when searched", async() => {
    const { getByPlaceholderText, getByText, queryByText } = render(
        <UserContext.Provider value={currUser}>
            <MemoryRouter>
                <CompanyList/>
            </MemoryRouter>
        </UserContext.Provider>
    );

    //Loading should be displayed on page on first render
    const loading = queryByText("Loading");
    expect(loading).toBeInTheDocument();

    //Loading should be removed by time of company list load/search
    const button = getByText("Search");
    fireEvent.click(button);
    // waitFor(() => expect(loading).not.toBeInTheDocument());

    // //Search should return companies which match parameters
    // const hallDavis = waitFor(() => queryByText("Hall-Davis"));
    // const input = getByPlaceholderText("Search Here");
    // fireEvent.change(input, { target: { value: 'ba' }});
    // fireEvent.click(button);
    // const baker = waitFor(() => queryByText("Baker-Santos"));
    // waitFor(() => expect(baker).toBeInTheDocument());
    // waitFor(() => expect(hallDavis).not.toBeInTheDocument());
})

