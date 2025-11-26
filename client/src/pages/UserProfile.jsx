import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import { Badge, Button, Table, ProfilePhotoUpload, SectionHeader } from "../components/common";
import { userService } from "../services/userService";
import moment from "moment";
import { FaEnvelope, FaPhone, FaRegEdit } from "react-icons/fa";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");

  const getAppointments = async () => {
    try {
      const res = await userService.getUserAppointments();
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoChange = async (photoData) => {
    setProfilePhoto(photoData);
    try {
      const res = await userService.updateUserProfile({
        ...user,
        profilePhoto: photoData,
      });
      if (res.data.success) {
        console.log("Profile photo updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <section className="space-y-8 rounded-3xl border border-[#4a5568] bg-[#2d3748] p-6 shadow-lg">
        <SectionHeader
          eyebrow="Account"
          title="Personal profile"
          description="Keep your contact details and health metrics up to date."
          action={
            <button className="btn-outline inline-flex items-center gap-2">
              <FaRegEdit /> Edit profile
            </button>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
          <div className="space-y-6 rounded-2xl border border-[#4a5568] bg-[#1f2937] p-6">
            <div className="text-center">
              <ProfilePhotoUpload currentPhoto={profilePhoto} onPhotoChange={handlePhotoChange} />
              <h2 className="mt-4 text-xl font-semibold text-gray-100">{user?.name}</h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <div className="mt-3 inline-flex flex-wrap justify-center gap-2">
                {user?.isDoctor && <Badge variant="info">Doctor</Badge>}
                {user?.isAdmin && <Badge variant="warning">Admin</Badge>}
                {!user?.isDoctor && !user?.isAdmin && <Badge variant="neutral">Patient</Badge>}
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-[#4a5568] bg-[#2d3748] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</p>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 px-3 py-2 text-amber-500">
                    <FaEnvelope />
                  </div>
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-[#1f2937] px-3 py-2 text-gray-400">
                    <FaPhone />
                  </div>
                  <span>{user?.phone || "Not provided"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 text-xs text-gray-300">
              <p className="font-semibold text-gray-100">Secure account</p>
              <p>All profile updates trigger an email confirmation. Reach out to support for sensitive changes.</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow">
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">Health metrics</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Height", value: `${user?.height || "--"} cm` },
                    { label: "Weight", value: `${user?.weight || "--"} kg` },
                    { label: "Blood group", value: user?.bloodGroup || "--" },
                    { label: "Age", value: `${user?.age || "--"} yrs` },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-white/80 bg-[#1f2937]/80 p-4 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-400">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-gray-100">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </section>
              <div className="text-right">
                <button className="btn-outline inline-flex items-center gap-2">
                  Update health data
                </button>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">Recent appointments</p>
              {appointments.length === 0 ? (
                <div className="rounded-2xl border border-white/60 bg-[#1f2937]/60 py-8 text-center text-gray-400">
                  No appointment history yet.
                </div>
              ) : (
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Header>Doctor</Table.Header>
                      <Table.Header>Date</Table.Header>
                      <Table.Header>Status</Table.Header>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {appointments.slice(0, 5).map((app) => (
                      <Table.Row key={app._id}>
                        <Table.Cell>
                          <div className="font-semibold">
                            Dr. {app.doctorInfo.firstName} {app.doctorInfo.lastName}
                          </div>
                          <p className="text-xs text-gray-400">{app.doctorInfo.specialization}</p>
                        </Table.Cell>
                        <Table.Cell>
                          <p>{moment(app.date, "DD-MM-YYYY").format("MMM DD, YYYY")}</p>
                          <p className="text-xs text-gray-400">
                            {moment(app.time, "HH:mm").format("hh:mm A")}
                          </p>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge
                            variant={
                              app.status === "pending"
                                ? "warning"
                                : app.status === "approved"
                                ? "success"
                                : "error"
                            }
                          >
                            {app.status}
                          </Badge>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}

              {appointments.length > 0 && (
                <div className="text-center">
                  <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/appointments")}>
                    View all appointments
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserProfile;
