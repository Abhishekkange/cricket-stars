const Product = require('../models/product-model')
const Team = require('../models/team-model');


async function getProductsFromTeamId(req,res)
{
    const { teamId, size, page, limit } = req.query;

    const query = {};

    if (teamId) {
        query.teamId = teamId;
    }

    if (size) {
        query.height = { $regex: new RegExp(size, 'i') };
    }

    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
    };

    try {
        const products = await Product.paginate(query, options);

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }


}

async function getTeamDetails(req,res)
{
    const { id } = req.params;

  try {
    const team = await Team.findOne({ team_id: id });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({
      teamName: team.teamName,
      teamImage: team.teamImage,
      teamDescription: team.teamDescription
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

module.exports = {getProductsFromTeamId,getTeamDetails}