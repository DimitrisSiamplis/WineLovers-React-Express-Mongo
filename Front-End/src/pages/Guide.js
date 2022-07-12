import React from "react";
import "./Guide.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";

const Guide = () => {
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  return (
    <div>
      <div className="title">
        <Row>
          <Col xs={9}>
            <h2>
              Wine Quide <CgNotes />{" "}
            </h2>
          </Col>
        </Row>

        <hr />
        <p>
          <strong className="arrow">&#8594;</strong> If you want to chooce the
          perfect wine for you and your family , below we present you a wine
          guide.{" "}
        </p>
        <p>
          <strong className="arrow">&#8594;</strong> Help Us to find the perfect
          wine for you by clicking here{" "}
          <a href="/helpUs">Your opinion matters.</a>{" "}
        </p>
      </div>

      <div className="title">
        <h5 className="guidecontainer">
          <strong>1. </strong>Combine the wine with your food appropriately
        </h5>

        <img
          className="imageCategory"
          src="https://superiorfs.com.au/Images/Article%20Images/banner-blog-superior-food_wine-1-@2x.jpg"
        ></img>
        <br />
        <br />
        <p>
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;The good pairing of wine with food is one of
          the most important things to enjoy your wine. There is nothing worse
          in a meal than the wine not accompanying the food properly. Τhe
          different tastes and intensities between wine and food will make you
          suffer.{" "}
          <strong>
            We should emphasize that any wine and food pairing is primarily
            about your personal preferences. What is tasty to someone is not to
            you and so on. However, gaining knowledge about the perfect wine and
            food pairing is a wise move to impress your guests or loved ones.
          </strong>{" "}
          Βelow we present some 'rules' regarding the combination of food and
          wine :
        </p>
        <div className="rules">
          <p className="ruleTitle">
            &#8226; The wine should complement and not neutralize the meal
          </p>
          <p className="rulesContain">
            Think of wine as an additional seasoning or spice to your food.
            Different seasonings will give different flavor and interact
            differently with your meal, so it's up to you to get the right
            combination. Some flavors go perfectly with others and here are some
            tips for the perfect wine and food pairing.
          </p>
          <p className="rulesContain">
            <strong className="arrow rule">&#8594;</strong> Acidic foods require
            acidic wines.
          </p>
          <p className="rulesContain">
            <strong className="arrow rule">&#8594;</strong> Spicy dishes call
            for sweet wines.
          </p>
          <p className="rulesContain">
            <strong className="arrow rule">&#8594;</strong> Savory foods need
            sparkling wines.
          </p>
          <p className="rulesContain">
            <strong className="arrow rule">&#8594;</strong> Combine sweet dishes
            with sweet wine.
          </p>
          <p className="rulesContain">
            <strong className="arrow rule">&#8594;</strong> Fatty meals need
            wines with strong tannins (tannins are natural compounds found in
            the skin of grapes and are the astringent taste you feel when you
            drink some wines).
          </p>
        </div>

        <div className="rules">
          <p className="ruleTitle">&#8226; Match the "tenses"</p>
          <p className="rulesContain">
            If finding the perfect combination in the wine and food relationship
            is very difficult for you because you have not yet found the golden
            ratio, there is an infallible rule of survival. When you are asked
            to choose which wine to drink with your food and you have no idea,
            then match their intensities. And to be more clear, choose a fine
            and cool wine with fine and cool dishes (salads, vegetables, fish,
            etc.). Moderate and rich wines with moderate and rich meals (roast
            chicken, pasta, strong sauces). Bold and characterful wines with
            bold and characterful dishes (spicy meats, cheeses, charcuterie,
            etc.).
          </p>
        </div>

        <div className="rules">
          <p className="ruleTitle">
            &#8226; Too many flavors? Find the flavor that dominates and combine
            your wine based on it
          </p>
          <p className="rulesContain">
            If you've made a meal that has many flavors, from salads to roasts,
            you'll be wondering what I'm doing now? Do not get nervous. Choose
            the most intense flavor and combine it with the wine. So yes, you
            can drink a red wine with fish if its aroma profile allows it.
          </p>
        </div>
        <h5>
          {" "}
          <a href="/foodAndWine">More details about Wine & Food</a>{" "}
        </h5>
      </div>

      <div className="title">
        <h5 className="guidecontainer">
          <strong>2. </strong>Match your wine with the 'type of day' or season
        </h5>
        <Container>
          <Row>
            <Col xs={deviceSize < 1000 ? 12 : 4}>
              <img
                className="imageCategory"
                src="https://www.harryanddavid.com/blog/wp-content/uploads/2020/12/wine-for-christmas-1200x675-1.jpg"
              ></img>
            </Col>
            <Col xs={deviceSize < 1000 ? 12 : 4}>
              <img
                className="imageCategory"
                src="https://img.freepik.com/free-photo/easter-table-setting-with-wooden-rabbit-decoration_72772-20986.jpg"
              ></img>
            </Col>
            <Col xs={deviceSize < 1000 ? 12 : 4}>
              <img
                className="imageCategory"
                src="data:image/jpeg;base64,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"
              ></img>
            </Col>
          </Row>
        </Container>
        <br />
        <p>
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Christmas, Easter, Saint Valentine's Day</strong> are special
          moments of the year. Which means specific food on the table, specific
          season and atmosphere at home.
          <br />
          For this reason, the appropriate combination of wine and occasion is
          essential. For example, at Christmas the weather is cold and our table
          is full of many sweet and savory goodies, red or white meat. All these
          must be taken into account before choosing the wine with which to
          celebrate that day.
        </p>
      </div>

      <div className="title">
        <h5 className="guidecontainer">
          <strong>3. </strong>Wine description terms
        </h5>

        <br />
        <p>
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;There are several terminologies in wine
          tasting. Many of them are demanding as they require continuous wine
          tasting and experience for someone to understand them.Terminologies
          are indispensable for someone who wants to find the wine that suits
          their occasion. And this is because in the description of a wine the
          winemaker has described his wine in sufficient detail, using many of
          these terminologies. Below we mention the most important terms
          concerning the description of wines :
        </p>
      </div>

      <div className="title">
        <h5 className="guidecontainer">
          <strong>4. </strong>Suitable equipment for wine tasting
        </h5>
        <Container>
          <Row>
            <Col xs={deviceSize < 1000 ? 12 : 6}>
              <img
                className="imageCategory"
                src="https://media.winefolly.com/selecting-the-proper-wine-drink-glass.jpg"
              ></img>
            </Col>
            <Col xs={deviceSize < 1000 ? 12 : 6}>
              <img
                className="imageCategory"
                src="https://media.winefolly.com/how-to-open-a-bottle-of-wine_1200x900-scaled.jpg"
              ></img>
            </Col>
          </Row>
        </Container>
        <br />
        <p>
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;There are several terminologies in wine
          tasting. Many of them are demanding as they require continuous wine
          tasting and experience for someone to understand them.Terminologies
          are indispensable for someone who wants to find the wine that suits
          their occasion. And this is because in the description of a wine the
          winemaker has described his wine in sufficient detail, using many of
          these terminologies. Below we mention the most important terms
          concerning the description of wines :
        </p>
      </div>
    </div>
  );
};

export default Guide;
