/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex, Text, Heading, Image, Link as DLink } from "@rebass/emotion";
import {
  DialogButton,
  Tabs,
  TabContent
} from "tuteria-shared/lib/shared/primitives";
import { HomePageSpinner } from "tuteria-shared/lib/shared/primitives/Spinner";
import React from "react";
import {
  ListGroup,
  ListItem,
  DetailItem,
  SectionListPage,
  SubjectDetailView,
  TutorDetailHeader,
  VerificationItem
} from "tuteria-shared/lib/shared/reusables";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { DataContext } from "tuteria-shared/lib/shared/DataContext";
import { actions as cActions } from "../appContext";

const SubjectListItemComponent = ({ name, to = "" }) => {
  let stylings = `display: block;
        border-bottom: 1px solid black;
        padding-top: 15px;
        padding-bottom: 15px;`;
  return to ? (
    <Link
      to={to}
      css={css`
        cursor: pointer;
        ${stylings}
      `}
    >
      {name}
    </Link>
  ) : (
    <Text
      css={css`
        ${stylings}
      `}
    >
      {name}
    </Text>
  );
};

const actions = {
  EMAIL_VERIFICATION: "email_verification",
  ID_VERIFICATION: "id_verification",
  PROFILE_VERIFICATION: "profile_verification"
};
class SubjectDetailSection extends React.Component {
  options = [
    { value: "active", text: "Mark as active" },
    { value: "denied", text: "Deny Skill" },
    { value: "modification", text: "Get tutor to modify skill" }
  ];
  render() {
    let { skills, match } = this.props;
    let skillInfo = skills.find(x => x.skill_name === match.params.skill);
    return (
      <SubjectDetailView
        skill={skillInfo}
        dialogText={data => {
          if (data === "active")
            return "Are you sure you want to set this subject as active?";
          if (data === "denied")
            return "Are you sure you want to deny this subject?";
          return "Are you sure you want the tutor to modify this subject?";
        }}
        options={this.options.filter(x => x.value !== skillInfo.status)}
        onRetakeTest={() => this.props.onRetakeTest(skillInfo, "freeze")}
        onStatusChange={action =>
          this.props.updateSubjectStatus(skillInfo, action)
        }
      />
    );
  }
}
export class TutorDetailPage extends React.Component {
  static contextType = DataContext;

  state = {
    data: {},
    loading: false,
    record: null,
    email_approval: false,
    id_verified: false,
    profile_rejected: false,
    skills: [],
    pending_verifications: []
  };
  componentDidMount() {
    let {
      match: {
        params: { email, slug }
      },
      history
    } = this.props;
    let { dispatch, actions } = this.context;
    dispatch({
      type: actions.TUTOR_INFO,
      value: { email, slug }
    })
      .then(data => {
        this.setState(data);
      })
      .catch(error => {
        history.push("/tutor-list");
      });
    dispatch({ type: actions.TUTOR_SKILLS, value: { email, slug } }).then(
      data => {
        this.setState({ skills: data });
      }
    );
    this.getWorkingData();
  }
  getWorkingData = () => {
    let { dispatch, actions } = this.context;
    return dispatch({ type: actions.FETCH_TUTOR_WORKING_DATA, value: {} }).then(
      data => {
        this.setState({ pending_verifications: data });
      }
    );
  };
  denyTutor = () => {
    this.setState({ loading: true });
    return this.localDispatch(cActions.DENY_TUTOR).then(data => {
      this.setState({ data, loading: false });
      this.props.history.push("/tutor-list");
    });
  };

  approveTutor = () => {
    this.setState({ loading: true });
    return this.localDispatch(cActions.APPROVE_TUTOR, {
      verified: this.state.data.verified
    }).then(data => {
      this.setState({ data, loading: false, record: null });
      this.props.history.push("/tutor-list");
    });
  };
  localDispatch = (type, values) => {
    let { dispatch } = this.context;
    return dispatch({
      type,
      value: Boolean(values)
        ? { email: this.state.data.email, ...values }
        : this.state.data.email
    });
  };
  emailButtons = () => {
    let { record, email_approval } = this.state;
    let approveManually = {
      children: "Approve Manually",
      dialogText: "Are you sure you want to manually approve the email",
      confirmAction: () => {
        this.localDispatch(cActions.APPROVE_TUTOR_EMAIL).then(record => {
          this.setState({
            record,

            data: { ...this.state.data, email_verified: true },
            email_approval: true
          });
        });
      }
    };
    let data = email_approval
      ? [approveManually]
      : [
          {
            confirmAction: () => {
              this.localDispatch(cActions.NOTIFY_TUTOR_ABOUT_EMAIL, {
                full_name: this.state.data.full_name
              }).then(record => {
                this.setState({ record });
              });
            },
            dialogText:
              "Are you sure you want to notify the tutor about his email?",
            children:
              record && record.actions.includes(actions.EMAIL_VERIFICATION)
                ? "Send Notice Again"
                : "Send Notice"
          },
          approveManually
        ];
    return data;
  };
  verificationButton = () => {
    let { id_verified, record, data } = this.state;
    if (
      !Boolean(data.identification) ||
      Object.keys(data.identification).length === 0
    ) {
      return [
        {
          children: "Send Email Notice",
          disabled: this.state.id_verified,
          dialogText:
            "Are you sure you want to notify the tutor to upload an ID?",
          confirmAction: () => {
            this.localDispatch(cActions.UPLOAD_ID, {
              full_name: data.full_name
            }).then(record => {
              this.setState({ id_verified: true, record });
            });
          }
        }
      ];
    }
    let reject = {
      children: "Reject",
      dialogText: "You are about to reject the ID of the tutor. Confirm?",
      confirmAction: () => {
        this.localDispatch(cActions.REJECT_ID, {
          full_name: this.state.data.full_name
        }).then(record => {
          this.setState({
            record,
            data: {
              ...this.state.data,
              identification: {}
            }
          });
        });
      }
    };
    data = id_verified
      ? []
      : [
          {
            confirmAction: () => {
              this.localDispatch(cActions.APPROVE_ID, {
                full_name: this.state.data.full_name
              }).then(record => {
                this.setState({
                  record,
                  id_verified: true,
                  data: {
                    ...this.state.data,
                    identification: {
                      ...this.state.data.identification,
                      verified: true
                    }
                  }
                });
              });
            },
            dialogText: "Are you sure you want to approve the ID?",
            children:
              record && record.actions.includes(actions.ID_VERIFICATION)
                ? "Approve Again"
                : "Approve ID"
          },
          reject
        ];
    return data;
  };
  profilePicButton = () => {
    let result = [];
    let { record, data } = this.state;
    if (!Boolean(data.profile_pic)) {
      result.push({
        children: "Send Notice",
        disabled: this.state.profile_rejected,
        dialogText:
          "Are you sure you want to notify the tutor to upload a profile Pic?",
        confirmAction: () => {
          this.localDispatch(cActions.UPLOAD_PROFILE_PIC, {
            full_name: data.full_name
          }).then(record => {
            this.setState({ record, profile_rejected: true });
          });
        }
      });
    } else {
      if (record && record.actions.includes(actions.PROFILE_VERIFICATION)) {
        result.push({
          children: "Approve",
          disabled: this.state.profile_rejected,
          confirmAction: () => {
            this.localDispatch(cActions.APPROVE_PROFILE_PIC).then(record => {
              this.setState({ record, profile_rejected: true });
            });
          },
          dialogText:
            "Are you sure you want to approve the profilePic for the tutor?"
        });
      }
      result.push({
        children: "Reject",
        disabled: this.state.profile_rejected,
        confirmAction: () => {
          this.localDispatch(cActions.REJECT_PROFILE_PIC, {
            full_name: this.state.data.full_name
          }).then(() => {
            this.setState({ profile_rejected: true });
          });
        },
        dialogText:
          "Are you sure you want to delete the profilePic for the tutor?"
      });
    }
    return result;
  };
  idVerified(data = {}, force = false) {
    let newData = data;
    if (!Boolean(data)) {
      newData = {};
    }
    return force
      ? Boolean(newData.verified)
      : Object.keys(newData).length > 0
      ? newData.verified
      : true;
  }
  fromWorkingDirectory = () => {
    let {
      match: {
        params: { email }
      }
    } = this.props;
    return Boolean(email);
  };
  skillIsFrozen() {
    let { pending_verifications, data } = this.state;
    return pending_verifications
      .filter(x => x.actions.includes("froze_profile"))
      .map(x => x.email)
      .includes(data.email);
  }
  updateSubjectStatus = (skill, action) => {
    let { dispatch, actions } = this.context;
    dispatch({
      type: actions.SKILL_ADMIN_ACTION,
      value: {
        skill,
        email: this.state.data.email,
        action,
        full_name: this.state.data.full_name
      }
    }).then(skills => {
      if (skill) {
        this.setState({
          skills: this.state.skills.map(x =>
            x.skill.name === skill.skill.name ? skill : x
          )
        });
      }
      this.getWorkingData();
    });
  };
  render() {
    let { data } = this.state;

    return Object.keys(data).length === 0 ? (
      <HomePageSpinner />
    ) : (
      <Flex flexDirection="column">
        <TutorDetailHeader
          image={data.profile_pic}
          detail={[
            data.years_of_experience,
            data.full_name,
            data.email,
            data.phone_no
          ]}
          frozen={this.skillIsFrozen()}
          unFreezeProfile={() => this.updateSubjectStatus(null, "unfreeze")}
        >
          {this.idVerified(data.identification, true) && (
            <Text>Id Verified</Text>
          )}
          {data.email_verified && <Text>Email Verified</Text>}
          <Text>Social Veifications</Text>
        </TutorDetailHeader>
        <Tabs>
          <TabContent heading="Tutor Information">
            <Flex mb={4} flexDirection="column">
              <ListGroup name="Verifications" />
              {data.email_verified ? null : (
                <VerificationItem
                  buttons={this.emailButtons()}
                  label="Email Verification"
                />
              )}
              {this.idVerified(data.identification, true) ? null : (
                <VerificationItem
                  label="ID Verifications"
                  buttons={this.verificationButton()}
                >
                  {data.identification ? (
                    <DLink
                      css={css`
                        cursor: pointer;
                      `}
                      target="_blank"
                      href={data.identification.link}
                    >
                      {data.identification.link}
                    </DLink>
                  ) : null}
                </VerificationItem>
              )}
              <VerificationItem
                label="Profile Picture Approval"
                buttons={this.profilePicButton()}
              >
                <DLink
                  css={css`
                    cursor: pointer;
                  `}
                  target="_blank"
                  href={data.profile_pic}
                >
                  {data.profile_pic}
                </DLink>
              </VerificationItem>

              <ListGroup name="Tutor Description" />
              <Text p={3}>{data.tutor_description}</Text>
              <ListGroup name="Educations" />
              {data.educations.map(education => (
                <ListItem
                  key={education.school}
                  heading={education.school}
                  subHeading={education.course}
                  rightSection={education.degree}
                />
              ))}
              <ListGroup name="Work Experience" />
              {data.work_experiences.map(w_experience => (
                <ListItem
                  key={w_experience.name}
                  heading={w_experience.name}
                  subHeading={w_experience.role}
                />
              ))}
              <ListGroup name="Location" />
              {data.locations.map(location => (
                <ListItem
                  key={location.state}
                  heading={`${location.address} ${location.vicinity}, ${
                    location.state
                  }`}
                />
              ))}
              <ListGroup name="Subject Veluation Dump" />
              <Flex>
                <Flex
                  css={css`
                    flex: 1;
                  `}
                  flexDirection="column"
                >
                  <Heading>Potential Subjects</Heading>
                  {data.potential_subjects.map(subject => (
                    <DetailItem key={subject} label={subject} />
                  ))}
                  <Heading>Levels With Exam</Heading>
                  {JSON.stringify(data.levels_with_exam)}
                  <Heading>Answers</Heading>
                  {JSON.stringify(data.answers)}
                </Flex>
                <Flex
                  css={css`
                    flex: 1;
                  `}
                  flexDirection="column"
                >
                  <Heading>Classes</Heading>
                  {data.classes.map(klass => (
                    <DetailItem key={klass} label={klass} />
                  ))}
                  <Heading>Curriculum Used</Heading>
                  {data.curriculum_used.map(klass => (
                    <DetailItem key={klass} label={klass} />
                  ))}
                </Flex>
              </Flex>
              {data.curriculum_explanation ? (
                <React.Fragment>
                  <Heading>Curriculum Explanation</Heading>
                  <Text p={3}>{data.curriculum_explanation}</Text>
                </React.Fragment>
              ) : null}
              <Flex justifyContent="space-between" pt={3}>
                {!data.verified && (
                  <DialogButton
                    dialogText="Are you sure you want to approve this tutor"
                    confirmAction={this.approveTutor}
                    disabled={this.state.loading || this.state.record}
                  >
                    {`Approve Tutor`}
                  </DialogButton>
                )}
                <DialogButton
                  dialogText="Are you sure you want to deny this tutor?"
                  confirmAction={this.denyTutor}
                  disabled={this.state.loading}
                >
                  Deny Tutor
                </DialogButton>
                {data.verified && (
                  <DialogButton
                    dialogText="Are you sure you want to freeze this tutor profile"
                    confirmAction={() => {
                      this.updateSubjectStatus(null, "freeze");
                      this.setState({ data: { ...data, verified: false } });
                    }}
                    disabled={this.state.loading}
                  >
                    Freeze Profile
                  </DialogButton>
                )}
              </Flex>
            </Flex>
          </TabContent>
          <TabContent heading="Subjects" activeTab={1}>
            <Flex flexDirection="column">
              {this.state.skills.length === 0 ? (
                <HomePageSpinner />
              ) : (
                <Flex>
                  <Flex
                    flexDirection="column"
                    css={css`
                      flex: 1;
                      overflow-y: scroll;
                    `}
                  >
                    <SectionListPage
                      data={this.state.skills}
                      callback={skill => ({
                        name: skill.skill_name,
                        to:
                          skill.status !== "denied" &&
                          `${this.props.match.url}/subjects/${skill.skill_name}`
                      })}
                      funcGetter={item => item.status}
                      Component={SubjectListItemComponent}
                      orderFunc={(a, b) => {
                        if (a.status < b.status) return -1;
                        if (a.status > b.status) return 1;
                        return 0;
                      }}
                      keyIndex="skill_name"
                    />
                  </Flex>
                  <Flex
                    px={3}
                    py={3}
                    flexDirection="column"
                    css={css`
                      flex: 4;
                    `}
                  >
                    <Switch>
                      <Route
                        path="/tutor-list/:slug/subjects/:skill"
                        render={pathProps => {
                          return (
                            <SubjectDetailSection
                              {...pathProps}
                              updateSubjectStatus={this.updateSubjectStatus}
                              skills={this.state.skills}
                              onRetakeTest={this.updateSubjectStatus}
                            />
                          );
                        }}
                      />
                      {this.state.skills[0] &&
                        this.state.skills[0].status !== "denied" && (
                          <Redirect
                            to={`${this.props.match.url}/subjects/${
                              this.state.skills[0].skill_name
                            }`}
                          />
                        )}
                    </Switch>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </TabContent>
        </Tabs>
      </Flex>
    );
  }
}

export default TutorDetailPage;
