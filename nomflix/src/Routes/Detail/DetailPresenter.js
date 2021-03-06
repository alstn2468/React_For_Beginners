import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Ratings from "react-ratings-declarative";
import { Link } from "react-router-dom";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
    margin-bottom: 20px;
`;

const ItemContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 10px;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0px 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const Imdb = styled.a`
    display: inline-block;
    position: relative;
    top: 4px;
    width: 26px;
    height: 16px;
    border-radius: 2px;
    background-image: url(${(props) => props.src});
    background-position: center center;
    background-size: cover;
`;

const Youtube = styled.img`
    display: block;
    position: relative;
    bottom: 5px;
    width: 46px;
    height: 26px;
    background-image: url(${(props) => props.src});
    background-position: center center;
    background-size: cover;

    &:hover {
        opacity: 0.7;
    }
`;

const ProductionContainer = styled.div`
    margin-top: 20px;
`;

const ProductionTitle = styled.h2`
    font-size: 22px;
    margin-bottom: 10px;
`;

const ProductionData = styled.div`
    display: inline-flex;
    font-size: 14px;
    margin-right: 10px;
`;

const SeasonContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
`;

const SeasonPoster = styled.img`
    height: 250px;
    width: auto;
    margin-bottom: 5px;
`;

const SeasonText = styled.p`
    font-size: 16px;
`;

const DetailPresenter = ({ result, error, loading, pathname, isMovie }) =>
    loading ? (
        <>
            <Helmet>
                <title>Loading | Nomflix</title>
            </Helmet>
            <Loader />
        </>
    ) : error ? (
        <Message text={"Can't find anything."} />
    ) : (
        <Container>
            <Helmet>
                <title>
                    {result.original_title
                        ? result.original_title
                        : result.original_name}{" "}
                    | Nomflix
                </title>
            </Helmet>
            <Backdrop
                bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            />
            <Content>
                <Cover
                    bgImage={
                        result.poster_path
                            ? `https://image.tmdb.org/t/p/w300${result.poster_path}`
                            : require("../../assets/noPosterSmall.png")
                    }
                />
                <Data>
                    <Title>
                        {result.original_title
                            ? result.original_title
                            : result.original_name}
                    </Title>
                    <span role="img" aria-label="Go to videos">
                        <Link to={`${pathname}/video`}>
                            <Youtube
                                src={require("../../assets/youtube.png")}
                            />
                        </Link>
                    </span>
                    <ItemContainer>
                        {result.release_date
                            ? result.release_date.substring(0, 4)
                            : result.first_air_date.substring(0, 4)}
                        <Divider>•</Divider>
                        {result.runtime
                            ? result.runtime
                            : result.episode_run_time}{" "}
                        min
                        <Divider>•</Divider>
                        <Item>
                            {result.genres &&
                                result.genres.map((genres, index) =>
                                    index === result.genres.length - 1
                                        ? genres.name
                                        : `${genres.name} / `
                                )}
                        </Item>
                        <Divider>•</Divider>
                        {result.imdb_id && (
                            <>
                                <Item>
                                    <Imdb
                                        href={`https://www.imdb.com/title/${result.imdb_id}`}
                                        target={"_blank"}
                                        src={require("../../assets/imdb.png")}
                                    />
                                </Item>
                                <Divider>•</Divider>
                            </>
                        )}
                        {result.vote_average &&
                        parseFloat(result.vote_average) / 2 > 0 ? (
                            <Item>
                                <Ratings
                                    rating={parseFloat(result.vote_average) / 2}
                                >
                                    <Ratings.Widget
                                        widgetRatedColor="rgb(255,215,0)"
                                        widgetDimension="15px"
                                        widgetSpacing="0px"
                                    />
                                    <Ratings.Widget
                                        widgetRatedColor="rgb(255,215,0)"
                                        widgetDimension="15px"
                                        widgetSpacing="0px"
                                    />
                                    <Ratings.Widget
                                        widgetRatedColor="rgb(255,215,0)"
                                        widgetDimension="15px"
                                        widgetSpacing="0px"
                                    />
                                    <Ratings.Widget
                                        widgetRatedColor="rgb(255,215,0)"
                                        widgetDimension="15px"
                                        widgetSpacing="0px"
                                    />
                                    <Ratings.Widget
                                        widgetRatedColor="rgb(255,215,0)"
                                        widgetDimension="15px"
                                        widgetSpacing="0px"
                                    />
                                </Ratings>
                            </Item>
                        ) : (
                            "No Data"
                        )}
                    </ItemContainer>
                    <Overview>{result.overview}</Overview>
                    <ProductionContainer>
                        <ProductionTitle>Production Company</ProductionTitle>
                        {result.production_companies ? (
                            result.production_companies.map((company) => (
                                <ProductionData key={`company-${company.id}`}>
                                    {company.name} ({company.origin_country})
                                </ProductionData>
                            ))
                        ) : (
                            <ProductionData>No Data</ProductionData>
                        )}
                    </ProductionContainer>
                    <ProductionContainer>
                        <ProductionTitle>Production Countries</ProductionTitle>
                        {result.production_countrie ? (
                            result.production_countries.map((country) => (
                                <ProductionData key={`country-${country.id}`}>
                                    {country.name}
                                </ProductionData>
                            ))
                        ) : (
                            <ProductionData>No Data</ProductionData>
                        )}
                    </ProductionContainer>
                    {!isMovie && (
                        <ProductionContainer>
                            <ProductionTitle>Season</ProductionTitle>
                            {result.seasons ? (
                                result.seasons.map((season) => (
                                    <SeasonContainer>
                                        <SeasonPoster
                                            src={
                                                season.poster_path
                                                    ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                                                    : require("../../assets/noPosterSmall.png")
                                            }
                                        />
                                        <SeasonText>{season.name}</SeasonText>
                                    </SeasonContainer>
                                ))
                            ) : (
                                <ProductionData>No Data</ProductionData>
                            )}
                        </ProductionContainer>
                    )}
                </Data>
            </Content>
        </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    isMovie: PropTypes.bool.isRequired,
};

export default DetailPresenter;
