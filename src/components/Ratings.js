import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Media } from "reactstrap";
import SVG from "react-inlinesvg";
import starIcon from "../assets/img/icons/icon-star.svg";
import profilePhotoPlaceholder from "../assets/img/mock_imgs/profile.jpeg";
import { getFullName } from "../lib/helper";

const Ratings = props => {
  const [reviewCount, setReviewCount] = useState(3);

  const showMoreReviews = e => {
    e.preventDefault();
    const maxReview = ratings.length;
    return reviewCount < maxReview
      ? setReviewCount(reviewCount + 3)
      : setReviewCount(3);
  };

  const { ratings, classnames } = props;

  const getAllRatings = () => {
    let rating_arr = [];
    ratings.forEach(rating => {
      rating_arr.push(rating["rating"]);
    });
    return rating_arr;
  };

  const countRatings = (input, arr) => {
    return arr.filter(x => x === input).length;
  };

  const getWeightedAvarage = () => {
    const rating_arr = getAllRatings();
    return (
      (5 * countRatings(5, rating_arr) +
        4 * countRatings(4, rating_arr) +
        3 * countRatings(3, rating_arr) +
        2 * countRatings(2, rating_arr) +
        1 * countRatings(1, rating_arr)) /
      (countRatings(5, rating_arr) +
        countRatings(4, rating_arr) +
        countRatings(3, rating_arr) +
        countRatings(2, rating_arr) +
        countRatings(1, rating_arr))
    );
  };

  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };

  const showStars = stars_given => {
    const max_stars = Number(stars_given);
    let stars_arr = [];
    for (let i = 1; i < 6; i++) {
      stars_arr.push(
        <SVG
          key={i}
          src={starIcon}
          className={i <= max_stars ? "filled" : ""}
        />
      );
    }
    return stars_arr;
  };

  const showUserRatings = nrOfReviews => {
    return ratings.slice(0, nrOfReviews).map(rating => (
      <Media className="user-rating" key={rating.expertId}>
        <Media left bottom href="#">
          <Media
            object
            src={profilePhotoPlaceholder}
            alt="Generic placeholder image"
          />
        </Media>
        <Media body>
          <div className="rating-and-usage">
            <div className="rating-wrapper d-flex align-items-center">
              <span className="h7">
                <b>
                  {getFullName(rating.expertFirstName, rating.expertLastName)}
                </b>
              </span>{" "}
              {showStars(rating.rating).map(star => star)}
            </div>
          </div>
          <p className="h7">{rating.comment}</p>
        </Media>
      </Media>
    ));
  };

  return (
    <section className={`section content-cards ${classnames && classnames}`}>
      <Container>
        <div className="rating-and-usage">
          <div className="rating-wrapper d-flex align-items-center">
            <span className="h5 mb-0 mr-3">
              <b>Ratings {`(${ratings.length})`}</b>
            </span>
            {showStars(round(getWeightedAvarage())).map(star => star)}
            <span className="h7">{round(getWeightedAvarage(), 0)}/5</span>
          </div>
        </div>
        {/* /.rating-and-usage */}
        <div className="user-ratings">
          {showUserRatings(reviewCount)}
          <a href="#" className="text-link load-more" onClick={showMoreReviews}>
            {reviewCount < ratings.length ? "Read more..." : "Hide reviews"}
          </a>
        </div>
        {/* /.user-ratings */}
      </Container>
    </section>
  );
};

Ratings.propTypes = {
  classnames: PropTypes.string
};

export default Ratings;
