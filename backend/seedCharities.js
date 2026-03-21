const mongoose = require('mongoose');
const Charity = require('./models/Charity');
require('dotenv').config();

const charities = [
  {
    name: 'Cancer Research UK',
    description: 'The world\'s leading cancer charity dedicated to saving lives through research, influence and information.',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=200&h=200&auto=format&fit=crop',
    website: 'https://www.cancerresearchuk.org'
  },
  {
    name: 'Save the Children',
    description: 'Working in the UK and around the world to give children a healthy start in life, the opportunity to learn and protection from harm.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=200&h=200&auto=format&fit=crop',
    website: 'https://www.savethechildren.org.uk'
  },
  {
    name: 'Mind',
    description: 'Providing advice and support to empower anyone experiencing a mental health problem. We won\'t give up until everyone gets support and respect.',
    imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=200&h=200&auto=format&fit=crop',
    website: 'https://www.mind.org.uk'
  },
  {
    name: 'Greenpeace',
    description: 'An independent global campaigning network that acts to change attitudes and behaviour, to protect and conserve the environment.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=200&h=200&auto=format&fit=crop',
    website: 'https://www.greenpeace.org.uk'
  },
  {
    name: 'British Red Cross',
    description: 'Helping people in crisis, whoever and wherever they are. We are part of a global voluntary network, responding to conflicts and natural disasters.',
    imageUrl: 'https://images.unsplash.com/photo-1504150559433-c4aed6d3b14a?q=80&w=200&h=200&auto=format&fit=crop',
    website: 'https://www.redcross.org.uk'
  }
];

const seedCharities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas...');

    await Charity.deleteMany();
    console.log('Cleared existing charities.');

    await Charity.insertMany(charities);
    console.log('Seeded 5 charities successfully.');

    process.exit();
  } catch (error) {
    console.error('Error seeding charities:', error);
    process.exit(1);
  }
};

seedCharities();
