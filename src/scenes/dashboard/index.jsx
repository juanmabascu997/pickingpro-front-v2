import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { GetDashboardData } from "../../data/testData";
import { useSelector } from "react-redux";
import axios from "axios";
import { storeRoute } from "../../utils/APIRoutes";
import { Inventory, LibraryAddCheckOutlined } from "@mui/icons-material";
import CustomizedProgressBars from "../../components/ProgressBar";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cardData, setCardData] = React.useState({});
  const [subtitle, setSubtitle] = React.useState("");

  const packingProducts = useSelector((state) => state.packingProducts);
  const userInfo = useSelector((state) => state.user);
  const [connectedStores, setConnectedStores] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function getStores() {
    const { data } = await axios.get(storeRoute);

    if (data) {
      let res = data.map((e, index) => {
        return {
          ...e,
          id: index,
        };
      });
      setConnectedStores(res);
    }
  }

  React.useEffect(() => {
    setLoading(true);
    GetDashboardData().then((res) => setCardData(res));
    getStores();
    setSubtitle("Bienvenido " + userInfo.name);
    setLoading(false);
  }, [packingProducts]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle={subtitle} />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        gridColumn="span 12"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        p="30px"
        display="grid"
        mb="30px">
        <Typography variant="h5" fontWeight="600">
          Progreso
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CustomizedProgressBars
            progress={cardData?.picked_orders_in_the_week}
            limit={userInfo?.pickingGoals}
          />
          
        </Box>
        <Typography
            variant="p"
            fontWeight="400">
            Metas de Picking: {cardData?.picked_orders_in_the_week}  de {userInfo?.pickingGoals ? userInfo.pickingGoals : 0}
          </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CustomizedProgressBars
            progress={cardData?.packed_orders_in_the_week}
            limit={userInfo?.packingGoals}
          />
        </Box>
        <Typography
            variant="p"
            fontWeight="400">
            Metas de Packing: {cardData?.packed_orders_in_the_week}  de {userInfo?.packingGoals ? userInfo.packingGoals : 0}
          </Typography>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px">
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title={cardData.pending_orders}
            subtitle="Pendientes de empaquetar"
            progress="0.75"
            icon={
              <Inventory
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title={cardData.packed_orders_today}
            subtitle="Pendientes de envio"
            progress="0.50"
            icon={
              <LocalShippingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title={cardData.orders_to_pick}
            subtitle="Pendientes de pickeo"
            progress="0.30"
            icon={
              <LibraryAddCheckOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center">
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}>
                Gestiones realizadas por el usuario hoy
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}>
                {cardData.picked_orders_today + cardData.packed_orders_today}
              </Typography>
            </Box>
          </Box>
          {cardData && cardData.data_week && !loading ? (
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={false} dataProps={cardData.data_week} />
            </Box>
          ) : (
            <Box
              height="250px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="15px">
              <Typography variant="h4" color={colors.greenAccent[500]}>
                Cargando info ...
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Tiendas conectadas
            </Typography>
          </Box>
          {connectedStores.map((transaction, i) => (
            <Box
              key={`${transaction._id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px">
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600">
                  {transaction.nombre}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        {/* 
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>*/}
      </Box>
    </Box>
  );
};

export default Dashboard;
