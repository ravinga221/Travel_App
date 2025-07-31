import React from 'react';
import ServiceCard from './ServiceCard';
import { Container, Row, Col } from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [ 
{
    imgUrl: weatherImg,
    title: 'Calculate Weather',
    desc: 'Get the latest weather updates for your travel destination.',
  },
  {
    imgUrl: guideImg,
    title: 'Best Travel Guide',
    desc: 'Access expert travel guides and tips for your journey.'
  },
  {
    imgUrl: customizationImg,
    title: 'Customization',
    desc: 'Customize your travel plans according to your preferences.'
  }
];

const ServiceList = () => {
  return (
    <>
    {
      servicesData.map((item, index) => (
        <Col lg='3' key={index}>
            <ServiceCard item={item} />
        </Col>
      ))
    }
    </>
  );
};

export default ServiceList;