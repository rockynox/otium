import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const labels: { [index: string]: string } = {
    1: "Fuyez !",
    2: "Interessant",
    3: "Pas mal",
    4: "Incroyable",
    5: "Le film de ma vie"
};

interface RatingProps {
    ratingValue: number | null
    setRatingValue: (rating: number | null) => void
}

export const RatingComponent = (props: RatingProps) => {
    const [hover, setHover] = React.useState<number>(-1);

    return (
        <div className="rating-stars">
            <Rating
                name="hover-feedback"
                value={props.ratingValue}
                precision={1}
                onChange={(event, newValue) => {
                    props.setRatingValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {props.ratingValue ? <Box ml={2}>{labels[hover !== -1 ? hover : props.ratingValue]}</Box> :
                <Box ml={2}>{labels[hover]}</Box>}
        </div>
    );
};
