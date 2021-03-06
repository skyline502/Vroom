"""empty message

Revision ID: 522aad1f0400
Revises: 1841dbfa87c5
Create Date: 2022-05-09 17:34:18.163040

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '522aad1f0400'
down_revision = '1841dbfa87c5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('followed_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('follows')
    # ### end Alembic commands ###
