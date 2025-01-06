import * as React from 'react';
import clsx from 'clsx';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import {
	TreeItem2Content,
	TreeItem2IconContainer,
	TreeItem2Root,
	TreeItem2GroupTransition,
} from '@mui/x-tree-view/TreeItem2';
import { useTreeItem2, UseTreeItem2Parameters } from '@mui/x-tree-view/useTreeItem2';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { JSX } from 'react';

declare module 'react' {
	interface CSSProperties {
		'--tree-view-color'?: string;
		'--tree-view-bg-color'?: string;
	}
}

interface StyledTreeItemProps
	extends Omit<UseTreeItem2Parameters, 'rootRef'>,
	React.HTMLAttributes<HTMLLIElement> {
	bgColor?: string;
	bgColorForDarkMode?: string;
	color?: string;
	colorForDarkMode?: string;
	labelIcon: React.ElementType; //<SvgIconProps>;
	rowIcons?: JSX.Element[];
}

const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
	color: theme.palette.text.secondary,
}));

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
	marginBottom: theme.spacing(0.3),
	color: theme.palette.text.secondary,
	borderRadius: theme.spacing(2),
	paddingRight: theme.spacing(1),
	fontWeight: theme.typography.fontWeightMedium,
	'&.expanded': {
		fontWeight: theme.typography.fontWeightRegular,
	},
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
	},
	'&.focused, &.selected, &.selected.focused': {
		backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
		color: 'var(--tree-view-color)',
	},
}));

const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(({ theme }) => ({
	marginRight: theme.spacing(1),
}));

const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
	({ theme }) => ({
		marginLeft: 0,
		[`& .content`]: {
			paddingLeft: theme.spacing(2),
		},
	}),
);

export const CustomTreeItem = React.forwardRef(function CustomTreeItem(
	props: StyledTreeItemProps,
	ref: React.Ref<HTMLLIElement>,
) {
	const theme = useTheme();
	const {
		id,
		itemId,
		label,
		disabled,
		children,
		bgColor,
		color,
		labelIcon: LabelIcon,
		colorForDarkMode,
		bgColorForDarkMode,
		rowIcons,
		...other
	} = props;

	const {
		getRootProps,
		getContentProps,
		getIconContainerProps,
		getLabelProps,
		getGroupTransitionProps,
		status,
	} = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

	const style = {
		'--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
		'--tree-view-bg-color':
			theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
	};

	return (
		<TreeItem2Provider itemId={itemId}>
			<CustomTreeItemRoot {...getRootProps({ ...other, style })}>
				<CustomTreeItemContent
					{...getContentProps({
						className: clsx('content', {
							expanded: status.expanded,
							selected: status.selected,
							focused: status.focused,
						}),
					})}
				>
					{
						status.expandable
						?
						<CustomTreeItemIconContainer {...getIconContainerProps()}>
							<TreeItem2Icon status={status} />
						</CustomTreeItemIconContainer>
						:
						null
					}
					
					<Box
						sx={{
							display: 'flex',
							flexGrow: 1,
							alignItems: 'center',
							p: 0.5,
							pr: 0,
						}}
					>
						<Box component={LabelIcon} color="inherit" sx={{ mr: 1, width: '10%' }} />
						<Typography
							{...getLabelProps({
								variant: 'body2',
								sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1, width: '60%' },
							})}
						/>
						{
							rowIcons?.map((component, i) => (
								<div style={{width: '10%'}} key={`row-icon-for-${label}-${i}`}>{component}</div>
							))
						}
					</Box>
				</CustomTreeItemContent>
				{children && (
					<CustomTreeItemGroupTransition {...getGroupTransitionProps()} />
				)}
			</CustomTreeItemRoot>
		</TreeItem2Provider>
	);
});

function EndIcon() {
	return <div style={{ width: 24 }} />;
}


export default function GmailTreeView() {
	return (
		<SimpleTreeView
			aria-label="gmail"
			defaultExpandedItems={['3']}
			defaultSelectedItems="5"
			slots={{
				expandIcon: ArrowRightIcon,
				collapseIcon: ArrowDropDownIcon,
				endIcon: EndIcon,
			}}
			sx={{ flexGrow: 1, maxWidth: 400 }}
		>
			<CustomTreeItem itemId="1" label="All Mail" labelIcon={MailIcon} />
			<CustomTreeItem itemId="2" label="Trash" labelIcon={DeleteIcon} />
			<CustomTreeItem itemId="3" label="Categories" labelIcon={Label}>
				<CustomTreeItem
					itemId="5"
					label="Social"
					labelIcon={SupervisorAccountIcon}
					color="#1a73e8"
					bgColor="#e8f0fe"
					colorForDarkMode="#B8E7FB"
					bgColorForDarkMode={alpha('#00b4ff', 0.2)}
				/>
				<CustomTreeItem
					itemId="6"
					label="Updates"
					labelIcon={InfoIcon}
					color="#e3742f"
					bgColor="#fcefe3"
					colorForDarkMode="#FFE2B7"
					bgColorForDarkMode={alpha('#ff8f00', 0.2)}
				/>
				<CustomTreeItem
					itemId="7"
					label="Forums"
					labelIcon={ForumIcon}
					color="#a250f5"
					bgColor="#f3e8fd"
					colorForDarkMode="#D9B8FB"
					bgColorForDarkMode={alpha('#9035ff', 0.15)}
				/>
				<CustomTreeItem
					itemId="8"
					label="Promotions"
					labelIcon={LocalOfferIcon}
					color="#3c8039"
					bgColor="#e6f4ea"
					colorForDarkMode="#CCE8CD"
					bgColorForDarkMode={alpha('#64ff6a', 0.2)}
				/>
			</CustomTreeItem>
			<CustomTreeItem itemId="4" label="History" labelIcon={Label} />
		</SimpleTreeView>
	);
}