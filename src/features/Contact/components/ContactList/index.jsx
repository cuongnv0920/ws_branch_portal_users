import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import {
  Breadcrumbs,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { userApi } from "api";
import { useEffect, useState } from "react";
import ContactFilter from "../ContactFilters";
import SkeletonContact from "../Skeleton";
import "./styles.scss";

ContactList.propTypes = {};

function ContactList(props) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    roomId: 0,
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await userApi.getContact(filters);
        setContacts(contacts);
      } catch (error) {
        console.log(error);
      }
    };
    setLoading(false);
    fetchContacts();
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <div className="contact">
      <Breadcrumbs aria-label="breadcrumbs">
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="text.primary">
          Danh bạ
        </Link>
      </Breadcrumbs>

      <div className="contact__content contentContact">
        <Grid container spacing={1}>
          <Grid item md={7} sm={7} xs={7} lg={7}>
            <ContactFilter filters={filters} onChange={handleFiltersChange} />
          </Grid>

          <Grid item md={5} sm={5} xs={5} lg={5}>
            <List
              component="nav"
              subheader={
                <ListSubheader className="roomList__title" component="nav">
                  Danh bạ
                </ListSubheader>
              }
            >
              {loading ? (
                <SkeletonContact />
              ) : (
                <div className="containerContact">
                  {contacts
                    .sort((a, b) => a.level.sort - b.level.sort)
                    .map((contact) => (
                      <Card className="cardContact">
                        <CardContent className="cardContact__content">
                          <ListItem className="cardContact__listItem">
                            <ListItemIcon className="cardContact__listIcon">
                              <Person2OutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                              className="cardContact__listText"
                              primary={contact.fullName}
                            />
                          </ListItem>

                          <ListItem className="cardContact__listItem">
                            <ListItemIcon className="cardContact__listIcon">
                              <EmailOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                              className="cardContact__listText"
                              primary={contact.email}
                            />
                          </ListItem>

                          <ListItem className="cardContact__listItem">
                            <ListItemIcon className="cardContact__listIcon">
                              <PhoneAndroidOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                              className="cardContact__listText"
                              primary={contact.phone}
                            />
                          </ListItem>
                          <ListItem className="cardContact__listItem">
                            <ListItemIcon className="cardContact__listIcon">
                              <LocalPhoneOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                              className="cardContact__listText"
                              primary={contact.ext}
                            />
                          </ListItem>
                        </CardContent>
                        <CardActions className="cardContact__action">
                          <h5>{`Chức danh: ${contact.level.name}`}</h5>
                        </CardActions>
                      </Card>
                    ))}
                </div>
              )}
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ContactList;
