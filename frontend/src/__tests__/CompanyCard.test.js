import { render } from '@testing-library/react';
import CompanyCard from '../CompanyCard';
import { MemoryRouter } from "react-router";

it("renders without crashing", function() {
    render(
        <MemoryRouter>
            <CompanyCard
                handle="pizza"
                name="Pizza School"
                description="Become an exceptional pizza maker in 16 weeks."
                logo_url="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"/>
        </MemoryRouter>
    )
});

it("matches snapshot", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <CompanyCard
                handle="pizza"
                name="Pizza School"
                description="Become an exceptional pizza maker in 16 weeks."
                logo_url="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"/>
        </MemoryRouter>        
    );
    expect(asFragment()).toMatchSnapshot();
});