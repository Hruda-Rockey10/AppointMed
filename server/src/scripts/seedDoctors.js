const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const bcrypt = require("bcryptjs");
const path = require("path");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const connectDB = require("../config/db");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../../../.env") });

// Connect to DB
connectDB();

const doctorsData = [
  {
    firstName: "Dr. Rajesh",
    lastName: "Sharma",
    email: "rajesh.sharma@example.com",
    phone: "9876543210",
    website: "www.drrajeshsharma.com",
    address: "123, Health Avenue, Delhi",
    specialization: "Cardiologist",
    experience: "15 Years",
    feesPerCunsaltation: 1500,
    timings: {
      sunday: "10:00 AM - 2:00 PM",
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "9:00 AM - 5:00 PM",
    },
    education: "MBBS, MD (Cardiology)",
    institute: "AIIMS, New Delhi",
    about: "Dr. Rajesh Sharma is a renowned Cardiologist with over 15 years of experience in treating complex heart conditions.",
    practiceLog: "Senior Consultant at Max Super Speciality Hospital (2018-Present) • Interventional Cardiologist at Fortis Hospital Delhi (2013-2018) • Attending Physician at AIIMS Cardiology Dept (2010-2013) • Successfully performed 500+ angioplasty procedures • Published 15+ research papers in peer-reviewed journals",
    status: "approved",
  },
  {
    firstName: "Dr. Priya",
    lastName: "Patel",
    email: "priya.patel@example.com",
    phone: "9876543211",
    website: "www.drpriyapatel.com",
    address: "456, Wellness Road, Mumbai",
    specialization: "Dermatologist",
    experience: "8 Years",
    feesPerCunsaltation: 800,
    timings: {
      sunday: "Closed",
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "10:00 AM - 6:00 PM",
      thursday: "10:00 AM - 6:00 PM",
      friday: "10:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
    },
    education: "MBBS, MD (Dermatology)",
    institute: "Grant Medical College, Mumbai",
    about: "Dr. Priya Patel specializes in clinical and cosmetic dermatology, providing personalized skincare solutions.",
    practiceLog: "Consultant Dermatologist at Kokilaben Hospital Mumbai (2020-Present) • Associate at SkinVita Clinic (2016-2020) • Trained in advanced laser treatments and chemical peels • Managed 2000+ patients with chronic skin conditions • Regular speaker at dermatology conferences",
    status: "approved",
  },
  {
    firstName: "Dr. Amit",
    lastName: "Verma",
    email: "amit.verma@example.com",
    phone: "9876543212",
    website: "www.dramitverma.com",
    address: "789, Care Street, Bangalore",
    specialization: "Neurologist",
    experience: "12 Years",
    feesPerCunsaltation: 2000,
    timings: {
      sunday: "Closed",
      monday: "9:00 AM - 4:00 PM",
      tuesday: "9:00 AM - 4:00 PM",
      wednesday: "9:00 AM - 4:00 PM",
      thursday: "9:00 AM - 4:00 PM",
      friday: "9:00 AM - 4:00 PM",
      saturday: "9:00 AM - 1:00 PM",
    },
    education: "MBBS, DM (Neurology)",
    institute: "NIMHANS, Bangalore",
    about: "Dr. Amit Verma is a leading Neurologist known for his expertise in treating stroke and epilepsy.",
    practiceLog: "Head of Neurology at Apollo Hospitals Bangalore (2018-Present) • Consultant at Manipal Hospital (2012-2018) • Specialized in stroke management and epilepsy treatment • Conducted 30+ clinical trials for neurological disorders • Awarded Best Neurologist in Karnataka 2022",
    status: "approved",
  },
  {
    firstName: "Dr. Sneha",
    lastName: "Reddy",
    email: "sneha.reddy@example.com",
    phone: "9876543213",
    website: "www.drsnehareddy.com",
    address: "321, Cure Lane, Hyderabad",
    specialization: "Pediatrician",
    experience: "10 Years",
    feesPerCunsaltation: 600,
    timings: {
      sunday: "10:00 AM - 1:00 PM",
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 6:00 PM",
    },
    education: "MBBS, MD (Pediatrics)",
    institute: "Osmania Medical College, Hyderabad",
    about: "Dr. Sneha Reddy is a compassionate Pediatrician dedicated to the health and well-being of children.",
    practiceLog: "Senior Pediatrician at Rainbow Children's Hospital (2017-Present) • Pediatric Consultant at Care Hospitals (2014-2017) • Expert in neonatal care and childhood vaccinations • Treated 5000+ children for various pediatric conditions • Active member of Indian Academy of Pediatrics",
    status: "approved",
  },
  {
    firstName: "Dr. Vikram",
    lastName: "Singh",
    email: "vikram.singh@example.com",
    phone: "9876543214",
    website: "www.drvikramsingh.com",
    address: "654, Life Plaza, Chennai",
    specialization: "Orthopedic Surgeon",
    experience: "18 Years",
    feesPerCunsaltation: 1200,
    timings: {
      sunday: "Closed",
      monday: "8:00 AM - 4:00 PM",
      tuesday: "8:00 AM - 4:00 PM",
      wednesday: "8:00 AM - 4:00 PM",
      thursday: "8:00 AM - 4:00 PM",
      friday: "8:00 AM - 4:00 PM",
      saturday: "8:00 AM - 12:00 PM",
    },
    education: "MBBS, MS (Orthopedics)",
    institute: "Madras Medical College, Chennai",
    about: "Dr. Vikram Singh is an expert Orthopedic Surgeon specializing in joint replacement and sports injuries.",
    practiceLog: "Chief Orthopedic Surgeon at MIOT Hospitals Chennai (2015-Present) • Sports Medicine Consultant (2008-2015) • Performed 800+ successful joint replacement surgeries • Team doctor for Tamil Nadu Cricket Association • Fellow of Indian Orthopaedic Association",
    status: "approved",
  },
  {
    firstName: "Dr. Anjali",
    lastName: "Gupta",
    email: "anjali.gupta@example.com",
    phone: "9876543215",
    website: "www.dranjaligupta.com",
    address: "987, Hope Drive, Kolkata",
    specialization: "Gynecologist",
    experience: "14 Years",
    feesPerCunsaltation: 900,
    timings: {
      sunday: "Closed",
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 7:00 PM",
      friday: "10:00 AM - 7:00 PM",
      saturday: "10:00 AM - 2:00 PM",
    },
    education: "MBBS, MD (Obstetrics & Gynecology)",
    institute: "Medical College and Hospital, Kolkata",
    about: "Dr. Anjali Gupta provides comprehensive care for women's health, including pregnancy and reproductive health.",
    practiceLog: "Senior Gynecologist at Apollo Gleneagles Kolkata (2016-Present) • Consultant at Belle Vue Clinic (2010-2016) • Successfully managed 1500+ normal and high-risk deliveries • Expert in minimally invasive gynecological surgeries • Trained in fertility treatments and IVF",
    status: "approved",
  },
  {
    firstName: "Dr. Rohan",
    lastName: "Mehta",
    email: "rohan.mehta@example.com",
    phone: "9876543216",
    website: "www.drrohanmehta.com",
    address: "159, Vision Park, Ahmedabad",
    specialization: "Ophthalmologist",
    experience: "9 Years",
    feesPerCunsaltation: 700,
    timings: {
      sunday: "10:00 AM - 1:00 PM",
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 6:00 PM",
    },
    education: "MBBS, MS (Ophthalmology)",
    institute: "B.J. Medical College, Ahmedabad",
    about: "Dr. Rohan Mehta is a skilled Ophthalmologist offering advanced eye care services and surgeries.",
    practiceLog: "Consultant Ophthalmologist at LV Prasad Eye Institute Ahmedabad (2019-Present) • Associate at Divyajyoti Eye Hospital (2015-2019) • Performed 1200+ cataract surgeries with excellent outcomes • Specialized in LASIK and corneal transplants • Member of All India Ophthalmological Society",
    status: "approved",
  },
  {
    firstName: "Dr. Kavita",
    lastName: "Iyer",
    email: "kavita.iyer@example.com",
    phone: "9876543217",
    website: "www.drkavitaiyer.com",
    address: "753, Mind Center, Pune",
    specialization: "Psychiatrist",
    experience: "11 Years",
    feesPerCunsaltation: 1000,
    timings: {
      sunday: "Closed",
      monday: "11:00 AM - 8:00 PM",
      tuesday: "11:00 AM - 8:00 PM",
      wednesday: "11:00 AM - 8:00 PM",
      thursday: "11:00 AM - 8:00 PM",
      friday: "11:00 AM - 8:00 PM",
      saturday: "11:00 AM - 4:00 PM",
    },
    education: "MBBS, MD (Psychiatry)",
    institute: "AFMC, Pune",
    about: "Dr. Kavita Iyer is a dedicated Psychiatrist helping patients achieve mental wellness through therapy and medication.",
    practiceLog: "Senior Psychiatrist at Ruby Hall Clinic Pune (2017-Present) • Mental Health Consultant at Sassoon Hospital (2013-2017) • Specialized in treating anxiety, depression, and PTSD • Conducted 100+ mental health awareness workshops • Certified in Cognitive Behavioral Therapy (CBT)",
    status: "approved",
  },
  {
    firstName: "Dr. Arjun",
    lastName: "Nair",
    email: "arjun.nair@example.com",
    phone: "9876543218",
    website: "www.drarjunnair.com",
    address: "246, Heartbeat Hub, Kochi",
    specialization: "Cardiologist",
    experience: "20 Years",
    feesPerCunsaltation: 1800,
    timings: {
      sunday: "10:00 AM - 12:00 PM",
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "9:00 AM - 1:00 PM",
    },
    education: "MBBS, DM (Cardiology)",
    institute: "Amrita Institute of Medical Sciences, Kochi",
    about: "Dr. Arjun Nair is a senior Cardiologist with extensive experience in interventional cardiology.",
    practiceLog: "Director of Cardiology at Amrita Institute Kochi (2015-Present) • Senior Consultant at Lisie Hospital (2005-2015) • Performed 2000+ complex cardiac interventions • Pioneer in TAVI procedures in Kerala • President of Kerala Chapter of Cardiological Society of India",
    status: "approved",
  },
  {
    firstName: "Dr. Meera",
    lastName: "Joshi",
    email: "meera.joshi@example.com",
    phone: "9876543219",
    website: "www.drmeerajoshi.com",
    address: "852, Smile Clinic, Jaipur",
    specialization: "Dentist",
    experience: "6 Years",
    feesPerCunsaltation: 500,
    timings: {
      sunday: "10:00 AM - 2:00 PM",
      monday: "10:00 AM - 8:00 PM",
      tuesday: "10:00 AM - 8:00 PM",
      wednesday: "10:00 AM - 8:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "10:00 AM - 8:00 PM",
    },
    education: "BDS, MDS",
    institute: "SMS Medical College, Jaipur",
    about: "Dr. Meera Joshi is a gentle Dentist providing high-quality dental care for the whole family.",
    practiceLog: "Dental Surgeon at Fortis Escorts Hospital Jaipur (2019-Present) • Private Practice at SmileCare Dental Clinic (2018-Present) • Specialized in cosmetic dentistry and dental implants • Completed 3000+ root canal treatments • Certified in Invisalign clear aligner therapy",
    status: "approved",
  },
  {
    firstName: "Dr. Suresh",
    lastName: "Pillai",
    email: "suresh.pillai@example.com",
    phone: "9876543220",
    website: "www.drsureshpillai.com",
    address: "369, ENT World, Thiruvananthapuram",
    specialization: "ENT Specialist",
    experience: "13 Years",
    feesPerCunsaltation: 800,
    timings: {
      sunday: "Closed",
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "9:00 AM - 1:00 PM",
    },
    education: "MBBS, MS (ENT)",
    institute: "Government Medical College, Thiruvananthapuram",
    about: "Dr. Suresh Pillai specializes in disorders of the ear, nose, and throat, offering medical and surgical treatments.",
    practiceLog: "Consultant ENT Surgeon at Trivandrum Medical College (2016-Present) • Associate at KIMS Hospital (2011-2016) • Expert in endoscopic sinus surgery and cochlear implants • Successfully performed 600+ ENT surgeries • Regular contributor to Indian Journal of Otolaryngology",
    status: "approved",
  },
  {
    firstName: "Dr. Neha",
    lastName: "Kapoor",
    email: "neha.kapoor@example.com",
    phone: "9876543221",
    website: "www.drnehakapoor.com",
    address: "147, Fit Life, Chandigarh",
    specialization: "Dietitian",
    experience: "7 Years",
    feesPerCunsaltation: 600,
    timings: {
      sunday: "Closed",
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "10:00 AM - 6:00 PM",
      thursday: "10:00 AM - 6:00 PM",
      friday: "10:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
    },
    education: "M.Sc. (Nutrition & Dietetics)",
    institute: "PGIMER, Chandigarh",
    about: "Dr. Neha Kapoor is a certified Dietitian helping clients achieve their health goals through personalized nutrition plans.",
    practiceLog: "Clinical Dietitian at Max Superspeciality Mohali (2018-Present) • Nutrition Consultant at FitIndia Wellness Center (2017-2018) • Managed nutrition programs for 1000+ patients with diabetes and obesity • Conducted corporate wellness workshops • Certified diabetes educator",
    status: "approved",
  },
  {
    firstName: "Dr. Rahul",
    lastName: "Desai",
    email: "rahul.desai@example.com",
    phone: "9876543222",
    website: "www.drrahuldesai.com",
    address: "258, Gastro Care, Surat",
    specialization: "Gastroenterologist",
    experience: "16 Years",
    feesPerCunsaltation: 1400,
    timings: {
      sunday: "10:00 AM - 1:00 PM",
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 2:00 PM",
    },
    education: "MBBS, DM (Gastroenterology)",
    institute: "Government Medical College, Surat",
    about: "Dr. Rahul Desai is a leading Gastroenterologist treating digestive system disorders with advanced techniques.",
    practiceLog: "Head of Gastroenterology at Sunshine Global Hospital Surat (2015-Present) • Consultant at Kiran Hospital (2009-2015) • Performed 1500+ therapeutic endoscopy and colonoscopy procedures • Expert in managing inflammatory bowel disease • Published 10+ papers on gastroenterology",
    status: "approved",
  },
  {
    firstName: "Dr. Pooja",
    lastName: "Bhatia",
    email: "pooja.bhatia@example.com",
    phone: "9876543223",
    website: "www.drpoojabhatia.com",
    address: "963, Child Care, Lucknow",
    specialization: "Pediatrician",
    experience: "9 Years",
    feesPerCunsaltation: 700,
    timings: {
      sunday: "10:00 AM - 2:00 PM",
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 7:00 PM",
    },
    education: "MBBS, MD (Pediatrics)",
    institute: "KGMU, Lucknow",
    about: "Dr. Pooja Bhatia is a friendly Pediatrician providing expert care for infants, children, and adolescents.",
    practiceLog: "Senior Consultant at Sahara Hospital Lucknow (2018-Present) • Pediatrician at Mayo Clinic (2015-2018) • Specialized in childhood infectious diseases and developmental pediatrics • Immunization coordinator for 50+ schools • Active in government pulse polio campaigns",
    status: "approved",
  },
  {
    firstName: "Dr. Manish",
    lastName: "Tiwari",
    email: "manish.tiwari@example.com",
    phone: "9876543224",
    website: "www.drmanishtiwari.com",
    address: "741, Bone & Joint, Bhopal",
    specialization: "Orthopedic Surgeon",
    experience: "12 Years",
    feesPerCunsaltation: 1100,
    timings: {
      sunday: "Closed",
      monday: "10:00 AM - 5:00 PM",
      tuesday: "10:00 AM - 5:00 PM",
      wednesday: "10:00 AM - 5:00 PM",
      thursday: "10:00 AM - 5:00 PM",
      friday: "10:00 AM - 5:00 PM",
      saturday: "10:00 AM - 2:00 PM",
    },
    education: "MBBS, MS (Orthopedics)",
    institute: "Gandhi Medical College, Bhopal",
    about: "Dr. Manish Tiwari is a dedicated Orthopedic Surgeon specializing in trauma and joint replacement surgeries.",
    practiceLog: "Consultant Orthopedic Surgeon at Chirayu Hospital Bhopal (2016-Present) • Trauma Surgeon at AIIMS Bhopal (2013-2016) • Performed 400+ hip and knee replacement surgeries • Expert in arthroscopic procedures • Visiting faculty at Gandhi Medical College",
    status: "approved",
  },
];

const seedData = async () => {
  try {
    // Clear existing data
    await doctorModel.deleteMany({});
    await userModel.deleteMany({});
    console.log("Cleared existing doctors and users".red.inverse);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    for (const doctor of doctorsData) {
      // Create User
      const newUser = new userModel({
        name: `${doctor.firstName} ${doctor.lastName}`,
        email: doctor.email,
        password: hashedPassword,
        isDoctor: true,
        isAdmin: false,
        phone: doctor.phone,
      });
      const savedUser = await newUser.save();

      // Create Doctor linked to User
      const newDoctor = new doctorModel({
        ...doctor,
        userId: savedUser._id,
      });
      await newDoctor.save();
    }

    // Create a default admin user
    const adminUser = new userModel({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      isDoctor: false,
      isAdmin: true,
      phone: "0000000000",
    });
    await adminUser.save();
    console.log("Admin user created: admin@example.com / 123456".green.bold);

    // Create a default normal user
    const normalUser = new userModel({
      name: "Test User",
      email: "user@example.com",
      password: hashedPassword,
      isDoctor: false,
      isAdmin: false,
      phone: "1111111111",
    });
    await normalUser.save();
    console.log("Normal user created: user@example.com / 123456".green.bold);

    console.log("Doctors and Users Imported Successfully!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

seedData();
