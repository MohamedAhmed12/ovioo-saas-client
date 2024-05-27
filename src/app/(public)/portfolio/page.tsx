import PortfolioMediaCard from "@/components/Dashboard/Portfolio/MediaCard";
import { PortfolioInterface } from "@/interfaces";
import "@/styles/app/unauth/portfolio.scss";
import { getClient } from "@/utils/getClient";
import { ApolloClient, gql } from "@apollo/client";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import { ImageList, ImageListItem } from "@mui/material";

const tabsTitles = [
    { key: "all", value: "All" },
    { key: "ui_ux", value: "UI / UX" },
    { key: "logo_and_branding", value: "Logo & Brand identity" },
    { key: "graphic", value: "Graphic" },
    { key: "animation", value: "Animation" },
];
const LIST_PORTFOLIO = gql`
    query ListPortfolioPics275 {
        listPortfolio {
            id
            src
            alt
            type
            categories
        }
    }
`;

export default async function Portfolio() {
    const client: ApolloClient<any> | undefined = getClient();
    const res = await client
        ?.query({
            query: LIST_PORTFOLIO,
        })
        .catch((e) => console.log(`aportfolio fetching err: ${e}`));
    const portfolio = res?.data?.listPortfolio;

    return (
        portfolio?.length > 0 && (
            <div className="portfolio container flex flex-col mt-20 mb-40">
                <h2 className="mb-10 text-[2.5rem] text-center">
                    Ovioo <strong>projects</strong>
                </h2>
                <Tabs aria-label="Basic tabs" defaultValue={0}>
                    <TabList className="w-full justify-center flex !flex-col lg:!flex-row">
                        {tabsTitles.map((title, i) => (
                            <Tab key={i + "-tab"}>{title.value}</Tab>
                        ))}
                    </TabList>

                    {tabsTitles.map((title, i) => (
                        <TabPanel key={i + "-tab-panel"} value={i}>
                            <ImageList
                                className="w-full overflow-visible"
                                variant="quilted"
                                rowHeight="auto"
                            >
                                {portfolio.map(
                                    (
                                        elm: PortfolioInterface,
                                        index: number
                                    ) => {
                                        return (
                                            elm.categories.includes(
                                                title.key
                                            ) && (
                                                <ImageListItem
                                                    key={index + "img"}
                                                    className="flex aspect-[5/4] rounded-[20px]"
                                                >
                                                    <PortfolioMediaCard
                                                        asset={elm}
                                                    />
                                                </ImageListItem>
                                            )
                                        );
                                    }
                                )}
                            </ImageList>
                        </TabPanel>
                    ))}
                </Tabs>
            </div>
        )
    );
}
