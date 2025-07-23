import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../lib/dbConnect";
import users from "../../../models/users";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, profile }) {
      try {
        await dbConnect()
        const existingUser = await users.findOne({ email: user.email });

        if (!existingUser) {
          await users.create({
            firstName: profile.given_name || user.name?.split(" ")[0] || "",
            lastName: profile.family_name || user.name?.split(" ")[1] || "",
            email: user.email,
            image: user.image,
            mobile: user.mobile,
            password: user.password,
            accountType: user.accountType,
            status: user.status,
            bloodgroup: user.bloodgroup,
            adharNumber: user.adharNumber,
            panNumber: user.panNumber,
            address: user.address,
            pincode: user.pincode,
            yearofexperience: user.yearofexperience,
            bankaccountnumber: user.bankaccountnumber,
            ifsc: user.ifsc,
            bankname: user.bankname,
            typeOfEntity: user.typeOfEntity,
            vehicalRegistrationNumber: user.vehicalRegistrationNumber,
            alternatecontact: user.alternatecontact,
            emergencyContact: user.emergencyContact,
          });
        }

        return true;
      } catch (error) {
        console.error("Error saving user to DB", error);
        return false;
      }
    },

     async session({ session }) {
      const dbUser = await users.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.accountType = dbUser.accountType;
        session.user.mobile = dbUser.mobile;
        session.user.name = `${dbUser.firstName} ${dbUser.lastName}`;
        session.user.image = dbUser.image;
        session.user.status = dbUser.status;
        session.user.bloodgroup = dbUser.bloodgroup;
        session.user.adharNumber = dbUser.adharNumber;
        session.user.panNumber = dbUser.panNumber;
        session.user.address = dbUser.address;
        session.user.pincode = dbUser.pincode;
        session.user.yearofexperience = dbUser.yearofexperience;
        session.user.bankaccountnumber = dbUser.bankaccountnumber;
        session.user.ifsc = dbUser.ifsc;
        session.user.bankname = dbUser.bankname;
        session.user.typeOfEntity = dbUser.typeOfEntity;
        session.user.vehicalRegistrationNumber = dbUser.vehicalRegistrationNumber;
        session.user.alternatecontact = dbUser.alternatecontact;
        session.user.emergencyContact = dbUser.emergencyContact;
      }
      return session;
    }

  },

 
});
