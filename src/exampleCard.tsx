import React from "react";
import {makeStyles} from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles(() => ({
    card: {
        display: "flex",
        padding: "2px",
        borderRadius: 16
    },
    media: {
        minWidth: "25%",
        maxWidth: "25%",
        flexShrink: 0,
        backgroundColor: "grey",
        borderRadius: 12,
        boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9"
    },
    rating: {
        verticalAlign: "text-top"
    },
    content: {
        // padding:"0", "2px"," 0", "0"
    },
    heading: {
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: "0.5px",
        marginBottom: 0,
        marginRight: "1.5px",
        display: "inline-block"
    },
    body: {
        fontSize: 14,
        color: "grey"
    },
    divider: {
        // margin: spacing(1, 0),
    },
    textFooter: {
        fontSize: 14
    },
    icon: {
        fontSize: "1.2rem",
        verticalAlign: "bottom"
    }
}));

const ReviewCard2 = () => {
    const styles = useStyles();
    return (
        <Card className={styles.card} elevation={0}>
            <CardContent className={styles.content}>
                <Box mb={1}>
                    <h3 className={styles.heading}>Aegen magazines </h3>
                    <Rating
                        name={"rating"}
                        value={2}
                        className={styles.rating}
                        size={"small"}
                    />
                </Box>
                <p className={styles.body}>
                    Lorem ipsum is placeholder text commonly used in the graphic, print,
                    and publishing industries for previewing layouts and visual mockups.
                    credit (www.brighttv.co.th)
                </p>
                <Divider className={styles.divider} light/>
                <div>
                    <Link className={styles.textFooter}>
                        Read more <i className="small material-icons">keyboard_arrow_right</i>
                    </Link>
                    <div>
                        <i className="small material-icons">mode_comment</i>135
                        <i className="small material-icons">favorite</i>12
                    </div>
                </div>
            </CardContent>
            <CardMedia
                className={styles.media}
                image={
                    "https://www.brighttv.co.th/wp-content/uploads/2018/04/29739332_996623360491913_2322116227981377536_n.jpg"
                }
            />
        </Card>
    );
};

export default ReviewCard2;
