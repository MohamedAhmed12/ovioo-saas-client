import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CreditCard() {
    return (
        <Card className="ovioo-card with-shadow min-w-[300px] max-w-[350px] rounded-[10px] my-6">
            <CardContent>
                <Typography variant="h5" component="div" className="!text-[28px]">
                    Credit
                </Typography>
                <Typography variant="h3" align="center" className="!my-5 !text-[45px]">
                    $600
                </Typography>
            </CardContent>
        </Card>
    );
}
