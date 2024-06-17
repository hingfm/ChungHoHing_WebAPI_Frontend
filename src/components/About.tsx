// import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: "#135200", textAlign: "center", fontSize: '24px', fontWeight: 'bold' }}>
        About Our Canine Shelter
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img
          style={{ width: "50%", height: 'auto' }}
          src="/src/assets/shelters.jpeg"
          alt="shelter-img"
          className="profile-img-card"
        />
      </div>
      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Mission</h3>
        <p>
          Our mission is to provide a safe haven for homeless pets until a suitable forever home can be found. We
          focus on health, rehabilitation, and ensuring a high quality of life for all our residents during their
          stay with us.
        </p>
      </section>
      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>History</h3>
        <p>
          Founded in 1998, The Canine Shelter has been a refuge for over 5,000 dogs and counting. Our facility has
          grown from a small space in a kind donor's backyard to a fully functional shelter with veterinary care,
          grooming services, and behavioral training programs.
        </p>
      </section>
      <section>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Contact Info</h3>
        <p>
          For more information or to get in touch, please contact us:
          <br />Email: contact@canineshelter.com
          <br />Phone: (555) 123-4567
          <br />Address: 123 Puppy Lane, Happytown, HT 45678
        </p>
      </section>
    </div>
  );
}

export default About;
